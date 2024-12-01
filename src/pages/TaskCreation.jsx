import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import WorkasanaLayout from "../components/WorkasanaLayout";
import apiClient from "../utils/customAxios";




// Custom Select component for multi-select tags
const TagSelect = ({ options, value, onChange ,placeholder}) => (
  <Select
    isMulti
    options={options}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

TagSelect.propTypes = {
    // 'options' should be an array of objects with 'label' and 'value' properties
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    
    // 'value' should be an array of selected option objects (the same structure as 'options')
    value: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  
    // 'onChange' should be a function that accepts the selected values
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
  };
  

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [owners, setOwners] = useState([]);
  const [team, setTeam] = useState("");
  const [tags, setTags] = useState([]);
  const [timeToComplete, setTimeToComplete] = useState("");
  const [status, setStatus] = useState("");
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teams, setTeams] = useState([]); // option to select team from.
  const [tagsOptions, setTagsOptions] = useState([]);

  const resetForm = () => {
    setTaskName("");
    setProjectName("");
    setOwners([]);
    setTeam("");
    setTags([]);
    setTimeToComplete("");
    setStatus("");

  }
  // Fetch projects and team members from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await apiClient.get(`/api/projects/names`)
        const membersRes = await apiClient.get("/api/auth/users");
        const formatedMembers = membersRes.data.map((mem)=>({label:mem.name,value:mem.name}))
        const teamResp = await apiClient.get("/api/teams");
        const tagsResp = await apiClient.get("/api/tags/names");
        const formatedTags = tagsResp.data.map((tag)=> ({label:tag,value:tag}))
        setProjects(projectRes.data);
        setTeamMembers(formatedMembers);
        setTeams(teamResp.data);
        setTagsOptions(formatedTags);
      } catch (err) {
        toast.error(err.response.data.error);
        console.error("Error fetching data: ", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      taskName,
      projectName,
      owners: owners.map((owner) => owner.value),
      team,
      tags: tags.map((tag) => tag.value),
      timeToComplete,
      status,
    };
    try {
      const resp = await apiClient.post("/api/tasks", taskData);
      toast.success(resp.data.message);
      resetForm();
    //   toast
    //   alert("Task created successfully!");
    } catch (err) {
      console.error("Error creating task: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-secondary-light rounded-lg shadow-xl shadow-primary-light">
      

      {/* Task Name */}
      <div className="mb-4">
        <label htmlFor="taskName" className="block text-gray-700">Task Name</label>
        <input
          id="taskName"
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>

      {/* Project Name */}
      <div className="mb-4">
        <label htmlFor="projectName" className="block text-gray-700">Project Name</label>
        <select
          id="projectName"
          className="w-full p-2 border border-gray-300 rounded"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project,index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      {/* Owners */}
      <div className="mb-4">
        <label htmlFor="owners" className="block text-gray-700">Owners </label>
        <TagSelect options={teamMembers} value={owners} onChange={setOwners} placeholder="Select owners" />
      </div>

      {/* Team */}
      <div className="mb-4">
        <label htmlFor="team" className="block text-gray-700">Team</label>
        <select
          id="team"
          className="w-full p-2 border border-gray-300 rounded"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        >
          <option value="">Select Team</option>
          {teams.map((teamOption) => (
            <option key={teamOption._id} value={teamOption.name}>
              {teamOption.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700">Tags</label>
        <TagSelect options={tagsOptions} value={tags} onChange={setTags} placeholder="select tags" />
      </div>

      {/* Time to Complete */}
      <div className="mb-4">
        <label htmlFor="timeToComplete" className="block text-gray-700">Time to Complete (days)</label>
        <input
          id="timeToComplete"
          type="number"
          min="1"
          className="w-full p-2 border border-gray-300 rounded"
          value={timeToComplete}
          onChange={(e) => setTimeToComplete(e.target.value)}
          required
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <select
          id="status"
          className="w-full p-2 border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="status"
          required
        >
        <option value="">Select status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-secondary-dark text-white rounded hover:bg-secondary"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};



  

const TaskCreation = () => {
    return(
        <WorkasanaLayout heading={"Create New Task"} >
        <div>
        <TaskForm/>
        </div>
    </WorkasanaLayout>

    )
}

export default TaskCreation;