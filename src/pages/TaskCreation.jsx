// import axios from "axios";
// import PropTypes from 'prop-types';
// import { useEffect, useState } from "react";
// import Select from "react-select/base";
// import WorkasanaLayout from "../components/WorkasanaLayout";
// import apiClient from "../utils/customAxios";




// // Custom Select component for multi-select tags
// const TagSelect = ({ options, value, onChange }) => (
//   <Select
//     isMulti
//     options={options}
//     value={value}
//     onChange={onChange}
//     placeholder="Select Tags"
//   />
// );

// TagSelect.propTypes = {
//     // 'options' should be an array of objects with 'label' and 'value' properties
//     options: PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         value: PropTypes.string.isRequired,
//       })
//     ).isRequired,
    
//     // 'value' should be an array of selected option objects (the same structure as 'options')
//     value: PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         value: PropTypes.string.isRequired,
//       })
//     ).isRequired,
  
//     // 'onChange' should be a function that accepts the selected values
//     onChange: PropTypes.func.isRequired,
//   };
  

// const TaskForm = () => {
//   const [taskName, setTaskName] = useState("");
//   const [projectName, setProjectName] = useState("");
//   const [owners, setOwners] = useState([]);
//   const [team, setTeam] = useState("");
//   const [tags, setTags] = useState([]);
//   const [timeToComplete, setTimeToComplete] = useState("");
//   const [status, setStatus] = useState("To Do");
//   const [projects, setProjects] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [teams, setTeams] = useState([
//     { label: "Sales", value: "Sales" },
//     { label: "Marketing", value: "Marketing" },
//     { label: "Development", value: "Development" },
//     { label: "Finance", value: "Finance" }
//   ]);
//   const [tagsOptions, setTagsOptions] = useState([
//     { label: "Urgent", value: "Urgent" },
//     { label: "Bug", value: "Bug" },
//     { label: "Feature", value: "Feature" },
//   ]);

//   // Fetch projects and team members from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const projectRes = await apiClient.get(`/api/projects`)
//         console.log(projectRes);
//         const membersRes = await axios.get("/api/team-members");
//         setProjects(projectRes.data);
//         setTeamMembers(membersRes.data);
//       } catch (err) {
//         console.error("Error fetching data: ", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const taskData = {
//       taskName,
//       projectName,
//       owners: owners.map((owner) => owner.value),
//       team,
//       tags: tags.map((tag) => tag.value),
//       timeToComplete,
//       status,
//     };

//     try {
//       await axios.post("/api/tasks", taskData);
//       alert("Task created successfully!");
//     } catch (err) {
//       console.error("Error creating task: ", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-secondary-light rounded-lg shadow-xl shadow-primary-light">
      

//       {/* Task Name */}
//       <div className="mb-4">
//         <label htmlFor="taskName" className="block text-gray-700">Task Name</label>
//         <input
//           id="taskName"
//           type="text"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={taskName}
//           onChange={(e) => setTaskName(e.target.value)}
//           required
//         />
//       </div>

//       {/* Project Name */}
//       <div className="mb-4">
//         <label htmlFor="projectName" className="block text-gray-700">Project Name</label>
//         <select
//           id="projectName"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={projectName}
//           onChange={(e) => setProjectName(e.target.value)}
//           required
//         >
//           <option value="">Select Project</option>
//           {/* {projects.map((project) => (
//             <option key={project.id} value={project.name}>
//               {project.name}
//             </option>
//           ))} */}
//         </select>
//       </div>

//       {/* Owners */}
//       <div className="mb-4">
//         <label htmlFor="owners" className="block text-gray-700">Owners (Team Members)</label>
//         <Select
//           id="owners"
//           isMulti
//         //   options={teamMembers.map((member) => ({
//         //     label: member.name,
//         //     value: member.id,
//         //   }))}
//           value={owners}
//           onChange={setOwners}
//           placeholder="Select Team Members"
//           required
//         />
//       </div>

//       {/* Team */}
//       <div className="mb-4">
//         <label htmlFor="team" className="block text-gray-700">Team</label>
//         <select
//           id="team"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={team}
//           onChange={(e) => setTeam(e.target.value)}
//           required
//         >
//           <option value="">Select Team</option>
//           {/* {teams.map((teamOption) => (
//             <option key={teamOption.value} value={teamOption.value}>
//               {teamOption.label}
//             </option>
//           ))} */}
//         </select>
//       </div>

//       {/* Tags */}
//       <div className="mb-4">
//         <label htmlFor="tags" className="block text-gray-700">Tags</label>
//         {/* <TagSelect options={tagsOptions} value={tags} onChange={setTags} /> */}
//       </div>

//       {/* Time to Complete */}
//       <div className="mb-4">
//         <label htmlFor="timeToComplete" className="block text-gray-700">Time to Complete (days)</label>
//         <input
//           id="timeToComplete"
//           type="number"
//           min="1"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={timeToComplete}
//           onChange={(e) => setTimeToComplete(e.target.value)}
//           required
//         />
//       </div>

//       {/* Status */}
//       <div className="mb-4">
//         <label htmlFor="status" className="block text-gray-700">Status</label>
//         <select
//           id="status"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           required
//         >
//           <option value="To Do">To Do</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//           <option value="Blocked">Blocked</option>
//         </select>
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-secondary-dark text-white rounded hover:bg-secondary"
//         >
//           Create Task
//         </button>
//       </div>
//     </form>
//   );
// };



  

// const TaskCreation = () => {
//     return(
//         <WorkasanaLayout heading={"Create New Task"} >
//         <div>
//         <TaskForm/>
//         </div>
//     </WorkasanaLayout>

//     )
// }

// export default TaskCreation;