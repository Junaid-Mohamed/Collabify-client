import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CollabifyLayout from "../components/CollabifyLayout";
import apiClient from "../utils/customAxios";

const TeamForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState(""); 
    const resetForm = () => {
        setName("");
        setDescription("");  
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const teamData = {
        name,
        description,
      };
      try {
        const resp = await apiClient.post("/api/teams", teamData);
        toast.success(resp.data.message);
        resetForm();
        setTimeout(()=>{
            navigate('/teams')
        },1000)
      } catch (err) {
        console.error("Error creating team: ", err);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-secondary-light rounded-lg shadow-xl shadow-primary-light">
        
  
        {/* Team Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Team Name</label>
          <input
            id="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        {/* team description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Team Description</label>
          <input
            id="description"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-secondary-dark text-white rounded hover:bg-secondary"
          >
            Create Team
          </button>
        </div>
      </form>
    );
  };

const TeamCreation = () => {
    return(
        <CollabifyLayout heading={"Create New Team"} >
        <div>
        <TeamForm/>
        </div>
    </CollabifyLayout>

    )
}

export default TeamCreation;