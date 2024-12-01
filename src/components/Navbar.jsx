// Navbar.js
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary-dark p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-white text-xl font-bold">
          Workasana
        </div>

        {/* Navbar Links */}
        <div className="space-x-4">
          <Link to="/dashboard" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/reports" className="text-white hover:text-gray-300">Reports</Link>
          <Link to="/projects" className="text-white hover:text-gray-300">Projects</Link>
          <Link to="/create-task" className="text-white hover:text-gray-300">Create-Task</Link>
          <Link to="/teams" className="text-white hover:text-gray-300">Teams</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
