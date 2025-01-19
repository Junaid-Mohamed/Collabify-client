import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CollabifyLayout from "../components/CollabifyLayout";
import apiClient from "../utils/customAxios";
import { getDueDate } from "../utils/customFunctions";

const ProjectManagement = () => {

    const {project} = useParams();
    const projectName = decodeURIComponent(project);
    const [tasks,setTasks] = useState([]);
    const [tags,setTags] = useState([]);
    const [owners,setOwners] = useState([]);
    const [tagFilter,setTagFilter] = useState("");
    const [ownerFilter,setOwnerFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    /**
     * Short-Circuit Logic:
        For each filter, use ? : to decide if that filter should be applied:
        If the filter exists (tagFilter or ownerFilter), evaluate its condition.
        Otherwise, allow all tasks through (true).
     */
    const filteredTasks = tagFilter || ownerFilter 
    ? tasks.filter(t => 
        (tagFilter ? t.tags.some(tag => tag.name === tagFilter) : true) &&
        (ownerFilter ? t.owners.some(owner => owner.name === ownerFilter) : true)
      )
    : tasks;

    // Get sorted tasks based on sort order
    const sortedTasks = filteredTasks.sort((a, b) => {
    const dueDateA = new Date(getDueDate(a.createdAt, a.timeToComplete));
    const dueDateB = new Date(getDueDate(b.createdAt, b.timeToComplete));
    return sortOrder === "asc" ? dueDateA - dueDateB : dueDateB - dueDateA;
    });


    useEffect(()=>{
        const fetchTasks = async() => {
            const resp = await apiClient.get(`/api/tasks?project=${project}`);
            const fetchedTasks = resp.data;
            
            const uniqueTags = new Set();
            const uniqueOwners = new Set();

            fetchedTasks.forEach(task => {
                task.tags.forEach(tag=>uniqueTags.add(tag.name))
                task.owners.forEach(owner=>uniqueOwners.add(owner.name))
            })

            setTasks(fetchedTasks);
            setTags([...uniqueTags]);
            setOwners([...uniqueOwners]);
        }
        fetchTasks();
    },[])

    return(
        
        <CollabifyLayout heading={`Project: ${projectName}`} >
        <div className="grid gap-8 grid-cols-12" >
            <div className="border shadow-md bg-secondary-light shadow-primary-light sticky col-span-4 max-h-fit" >
                <div className="p-6 flex flex-col text-xl" >
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/dashboard'} >Back to dashboard</Link>   
                </div>
            </div>
            <div className="border shadow-md bg-secondary-light overflow-y-auto max-h-fit  shadow-primary-light col-span-8" >
                <div className="p-6 text-xl" >
                    <h1 className="text-2xl text-center" >Task List</h1>
                    <hr className="my-2 border border-white" />
                    <div className="mt-4 flex gap-2" >
                        <label>Filter By: </label>
                        <select onChange={(e)=> setTagFilter(e.target.value)} className="bg-secondary mx-2 p-1" name="tagFilter">
                            <option value="">tag</option>
                            {tags.map(t=>(<option key={t} value={t}>{t}</option>))}
                        </select>
                        <select onChange={(e)=> setOwnerFilter(e.target.value)} className="bg-secondary mx-2 p-1" name="ownerFilter">
                            <option value="">owner</option>
                            {owners.map(o=>(<option key={o} value={o}>{o}</option>))}
                        </select>
                        <p className="underline text-primary-light hover:cursor-pointer" onClick={()=> {setTagFilter(""); setOwnerFilter("")}} >Clear</p>
                    </div>
                    <div className="my-4" >
                         {/* Sort toggle button */}
                         <label>Sort: </label>
                        <button className="bg-secondary mx-2  px-4" onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}>
                            {sortOrder === "asc" ? "Far Due" : "Near Due"}
                        </button>
                    </div>
                    { sortedTasks &&   <div className="flex flex-col mt-4 gap-2" > {sortedTasks.map((task)=>(
                        <div className="bg-secondary border rounded-md shadow-sm py-2 px-3" key={task._id} >
                             <p><span className="font-semibold" >{task.name}</span></p>
                             <p>status: {task.status}  </p>
                             <p>owners: {task.owners.map(o=>o.name).join(", ")}</p>
                             {/* <p>Due: {task.status !== 'Completed' ? `${getDueDate(task.createdAt, task.timeToComplete)}`:`Nil`}</p> */}
                             <p>Due: {`${getDueDate(task.createdAt, task.timeToComplete)}`}</p>

                        </div>
                       
                    ))}</div> }
                    <div className=" text-center mt-4" >
                    {/* <Link onClick={()=>navigate('/create-team')} className="bg-secondary border rounded-md shadow-sm py-2 px-3" >Add New Team</Link> */}
                    </div>
                </div>
            </div>
        </div>
    </CollabifyLayout>
      
    )
}

export default ProjectManagement;