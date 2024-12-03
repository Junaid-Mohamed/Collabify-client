import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import WorkasanaLayout from "../components/WorkasanaLayout";
import apiClient from "../utils/customAxios";
import { getDueDate } from "../utils/customFunctions";
const TaskDetails = () => {

    const {taskId} = useParams();
    const [task,setTask] = useState({});
    useEffect(()=>{
        const getTask = async()=>{
            const task = await apiClient.get(`/api/tasks/${taskId}`);
            setTask(task.data)
        }
        getTask();
    },[])

    const markTaskComplete = async() => {
        const resp = await apiClient.put(`/api/tasks/${taskId}`, {status:"Completed"});
        toast.success(resp.data.message);
    }
    return(
        <WorkasanaLayout heading={`Task: ${task.name}`} >
              <div className="grid gap-8 grid-cols-12" >
            <div className="border shadow-md bg-secondary-light shadow-primary-light sticky col-span-4 max-h-fit" >
                <div className="p-6 flex flex-col text-xl" >
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/dashboard'} >Back to dashboard</Link>   
                </div>
            </div>
            <div className="border shadow-md bg-secondary-light overflow-y-auto max-h-fit  shadow-primary-light col-span-8" >
                <div className="p-6 text-xl" >
                    <h1 className="text-2xl text-center" >Task Details</h1>
                    <hr  className="border border-white my-2" />
                    { Object.keys(task).length > 0 && 
                    <div className="bg-secondary border rounded-md shadow-sm py-2 px-3 mt-4" >
                        <p><span className="font-semibold" >Project:</span> {task.project.name} </p> 
                        <p><span className="font-semibold" >Team:</span> {task.team.name} </p> 
                        <p><span className="font-semibold" >Owners:</span> {task.owners.map(o=>o.name).join(", ")} </p> 
                        <p><span className="font-semibold" >Tags:</span> {task.tags.map(t=>t.name).join(", ")} </p> 
                        <p><span className="font-semibold" >Due Date:</span> {task.status !== "Completed" ? getDueDate(task.createdAt,task.timeToComplete)  : `Nil`} </p> 
                        <p><span className="font-semibold" >Status:</span> {task.status} </p> 
                        <p><span className="font-semibold" >Time Remaining:</span> {task.status !== "Completed" ? task.timeToComplete : 0} days</p> 
                        {task.status !== "Completed" && <button className="bg-primary-light p-2 my-2 rounded-lg" onClick={markTaskComplete} >Mark as Completed</button>}
                    </div>}
                </div>
            </div>
        </div>
    </WorkasanaLayout>
    )
}

export default TaskDetails;