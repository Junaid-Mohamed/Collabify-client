import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkasanaLayout from "../components/WorkasanaLayout";
import apiClient from "../utils/customAxios";

const TeamManagement = () => {

    const [teams,setTeams] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async() => {
            const resp = await apiClient.get(`/api/teams`);
            console.log(resp);
            setTeams(resp.data);
        }
        fetchData();
    },[])
    return(
        <WorkasanaLayout heading={"Team Management"} >
<div className="grid gap-8 grid-cols-12" >
            <div className="border shadow-md bg-secondary-light shadow-primary-light sticky col-span-4 max-h-fit" >
                <div className="p-6 flex flex-col text-xl" >
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/dashboard'} >Back to dashboard</Link>   
                </div>
            </div>
            <div className="border shadow-md bg-secondary-light overflow-y-auto max-h-fit  shadow-primary-light col-span-8" >
                <div className="p-6 text-xl" >
                    <div className="flex justify-between items-center" >
                    <h1 className="text-2xl" >Teams List</h1>
                    </div>
                    <div className="flex flex-col mt-2 gap-2" > {teams.map((team)=>(
                        <div className="bg-secondary border rounded-md shadow-sm py-2 px-3" key={team._id} >
                             <p>{`Team`}: {team.name} </p>
                        </div>
                       
                    ))}</div>
                    <div className=" text-center mt-4" >
                    <Link onClick={()=>navigate('/create-team')} className="bg-secondary border rounded-md shadow-sm py-2 px-3" >Add New Team</Link>
                    </div>
                </div>
            </div>
        </div>
    </WorkasanaLayout>
    
)}


export default TeamManagement;