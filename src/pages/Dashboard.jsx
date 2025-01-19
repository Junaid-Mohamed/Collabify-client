import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import CollabifyLayout from "../components/CollabifyLayout";
import apiClient from "../utils/customAxios";
import { getDueDate } from "../utils/customFunctions";

/**
 * url based filtering is pending.
 */

const Dashboard = () => {

    const [activeProjects, setProjects] = useState([]);
    const [tasks,setTasks] = useState([]);
    const [filterModal,setFilterModal] = useState(false);
    const [filter,setFilter] = useState("");

    const navigate = useNavigate();

    const filteredTasks = filter ? tasks.filter(task=> task.status === filter) : tasks;


    useEffect(()=>{
        const fetchData = async() => {
            const activeProjects = await apiClient.get(`/api/projects`);
            const allTasks = await apiClient.get('/api/tasks');
            setProjects(activeProjects.data);
            setTasks(allTasks.data);
        }
        fetchData();
    },[])

    // const getDueDate = (createdAt,dayToComplete) =>{
    //     const dueDate = new Date(createdAt);
    //     dueDate.setDate(dueDate.getDate()+dayToComplete);
    //     return dueDate.toISOString().split('T')[0];
    // }
    
    return(
    <CollabifyLayout heading={"Collabify Dashboard"} >
        <div className="grid h-screen gap-8 grid-cols-12" >
            <div className="border shadow-md bg-secondary-light shadow-primary-light sticky col-span-4 max-h-fit" >
                <div className="p-6 flex flex-col text-xl" >
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={''} >Project</Link>  
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/teams'}>Team</Link>  
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/reports'} >Reports</Link>  
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/create-task'} >Create Task</Link>  
                </div>
            </div>
            <div className="border shadow-md bg-secondary-light overflow-y-auto min-h-screen  shadow-primary-light col-span-8" >
                <div className="p-6 text-xl" >
                    <h1 className="text-2xl" >Active Projects</h1>
                  
                    <div className="flex mt-2 gap-2 flex-wrap" > {activeProjects.map((project)=>(
                        <Link to={`/projects/${encodeURIComponent(project.name)}`} className="bg-secondary border rounded-md shadow-sm py-1 px-3" key={project._id} >{project.name}</Link>
                    ))}</div>
                </div>
                <div className="p-6 text-xl" >
                    <div className="flex justify-between items-center" >
                    <h1 className="text-2xl" >Tasks</h1>
                    <div className="relative" > <CiFilter onClick={()=> setFilterModal(!filterModal)} className="text-primary-dark hover:cursor-pointer" />
                    { filterModal && 
                        <div className="absolute top-full right-0 mt-2 bg-primary-light shadow-lg border rounded w-40">
                            <ul>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() =>{ setFilter("In Progress"); setFilterModal(!filterModal)}}>
                                    In Progress
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {setFilter("Completed"); setFilterModal(!filterModal)}}>
                                    Completed
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {setFilter(""); setFilterModal(!filterModal)}}>
                                    Clear filter
                                </li>
                            </ul>
                        </div> }
                    </div>
                    </div>
                    <div className="flex flex-col mt-2 gap-2" > {filteredTasks.map((task,index)=>(
                        <div onClick={()=> navigate(`/task/${task._id}`) } className="bg-secondary border rounded-md shadow-sm py-2 px-3 hover:cursor-pointer" key={task._id} >
                             <p>{`Task ${index+1}`}: {task.name} </p>
                             <p>{`Due: ${getDueDate(task.createdAt,task.timeToComplete)}`}</p>
                             <p>{`Owners: ${task.owners.map(o=>o.name).join(", ")}`}</p>
                        </div>
                       
                    ))}</div>
                </div>
            </div>
        </div>
    </CollabifyLayout>
    )
}

export default Dashboard;