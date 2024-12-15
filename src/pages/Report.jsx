import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import WorkasanaLayout from "../components/WorkasanaLayout";
import apiClient from "../utils/customAxios";

// Registering Chart.js components

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Report = () => {

    const [chartData, setChartData] = useState({});
    const [daysChartData,setDaysChart] = useState({});
    const [ownerClosedTasks, setOwnerTasks] = useState({})
    const [teamClosedTasks, setTeamTasks] = useState({})

    useEffect(()=>{
        try{
            const fetchLastWeekReports = async () =>{
                const response = await apiClient.get(`api/reports/last-week`);
                const data = response.data;
                const taskCountsByDate = {};
                data.forEach(task=>{
                    const date = new Date(task.updatedAt).toLocaleDateString();
                    if(taskCountsByDate[date]){
                        taskCountsByDate[date]+=1
                    }else{
                        taskCountsByDate[date] = 1
                    }
                })
    
                const dates = Object.keys(taskCountsByDate);
                const tasksCount = Object.values(taskCountsByDate);
            
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: "Tasks Closed",
                            data: tasksCount,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                        }
                    ]
                })
            }
            fetchLastWeekReports();
        }catch(error){
            console.error(error);
        }
       
        const fetchData = async ()=>{
    
            const daysResponse = await apiClient.get(`api/reports/pending`);
            const daysData = daysResponse.data;

            const closedTaskResp = await apiClient.get(`api/reports/closed-tasks?groupBy=owner`)
            const ownersClosedTasks = closedTaskResp.data;

            const closedTaskResponse = await apiClient.get(`api/reports/closed-tasks?groupBy=team`)
            const teamsClosedTasksdata = closedTaskResponse.data;

            const completedDays = daysData.completed;
            const pendingDays = daysData.pending;

            setDaysChart({
                labels: ['Completed Work', 'Pending Work'], // Labels for the segments
                datasets: [
                  {
                    data: [completedDays, pendingDays], // Data points representing completed and pending work
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'], // Colors for each segment
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Border color for each segment
                    borderWidth: 1,
                  }
                ]
            })

            const owners = ownersClosedTasks.map(t=>t.owner);
            const closedTasksCount = ownersClosedTasks.map(t=>t.closedTasksCount)

            setOwnerTasks({
                labels: owners,
                datasets: [
                {           
                    label: "Closed Tasks",
                    data: closedTasksCount,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                }
                ],
            })

            const teams = teamsClosedTasksdata.map(t=>t.team);
            const teamClosedTasksCount = teamsClosedTasksdata.map(t=>t.closedTasksCount)
           
            setTeamTasks({
                labels: teams,
                datasets: [
                {           
                    label: "Closed Tasks",
                    data: teamClosedTasksCount,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                }
                ],
            })

        }
        fetchData();
    },[])

    return(
        <WorkasanaLayout heading={'Workasana Reports'} >
              <div className="grid gap-8 grid-cols-12" >
            <div className="border shadow-md bg-secondary-light shadow-primary-light sticky col-span-4 max-h-fit" >
                <div className="p-6 flex flex-col text-xl" >
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/dashboard'} >Back to dashboard</Link>   
                </div>
            </div>
            <div className="border shadow-md bg-secondary-light overflow-y-auto max-h-fit  shadow-primary-light col-span-8" >
                <div className="p-6 text-xl" >
                    <h1 className="text-2xl text-center" >Report Overview</h1>
                    <hr className="my-2 border border-white" />
                    <div className="my-6" >
                        {/* <h1>Total Work Done Last Week: </h1> */}
                        {/* <hr className="my-2 border border-white" /> */}
                        {chartData.labels ? (
                            <Bar data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Total Work Done Last Week',
                                        font: {
                                            size: 24, // Adjust this value to change the font size
                                            weight: 'bold', // Optional: You can also change the font weight
                                            family: 'Arial, sans-serif', // Optional: Customize font family
                                          },                                    
                                    },
                                }
                            }}
                            />
                        ): (<p>No Work completed last week</p>)}
                    </div>
                    <div className="my-6" > 
                        <hr className="my-2 border border-white" />
                        {daysChartData.labels ? (
                            <Doughnut data={daysChartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Days of Work Completed vs Days of Work Pending',
                                        font: {
                                            size: 24, // Adjust this value to change the font size
                                            weight: 'bold', // Optional: You can also change the font weight
                                            family: 'Arial, sans-serif', // Optional: Customize font family
                                          },                                    
                                    },
                                },
                                cutout: '50%',
                            }}
                            />
                        ): (<p>Loading data...</p>)}
                    </div>
                    <div className="my-6" >
                        {/* <h1>Tasks Closed by Team: </h1> */}
                        <hr className="my-2 border border-white" />
                        {teamClosedTasks.labels ? (
                            <Bar data={teamClosedTasks}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Tasks Closed by Team',
                                        font: {
                                            size: 24, // Adjust this value to change the font size
                                            weight: 'bold', // Optional: You can also change the font weight
                                            family: 'Arial, sans-serif', // Optional: Customize font family
                                          },                                    
                                    },
                                    legend: {
                                        display: true, // Hide the legend if not needed
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Teams',
                                            font: {
                                                size: 16,
                                                weight: 'bold',
                                            },
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Closed Tasks Count',
                                            font: {
                                                size: 16,
                                                weight: 'bold',
                                            },
                                        },
                                        beginAtZero: true, // Ensure Y-axis starts at 0
                                    },
                                },
                            
                            }}
                            />
                        ): (<p>Loading data...</p>)}
                    </div>
                    <div className="my-6" >
                        {/* <h1>Tasks Closed by Owner: </h1> */}
                        <hr className="my-2 border border-white" />
                        {ownerClosedTasks.labels ? (
                            <Bar data={ownerClosedTasks}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Tasks Closed by Owner',
                                        font: {
                                            size: 24, // Adjust this value to change the font size
                                            weight: 'bold', // Optional: You can also change the font weight
                                            family: 'Arial, sans-serif', // Optional: Customize font family
                                          },                                    
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Owners',
                                            font: {
                                                size: 16,
                                                weight: 'bold',
                                            },
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Closed Tasks Count',
                                            font: {
                                                size: 16,
                                                weight: 'bold',
                                            },
                                        },
                                        beginAtZero: true, // Ensure Y-axis starts at 0
                                    },
                                },
                            
                            }}
                            />
                        ): (<p>Loading data...</p>)}
                    </div>
                </div>
            </div>
        </div>
        </WorkasanaLayout>
      
    )
}

export default Report;