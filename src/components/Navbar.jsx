
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { rehydrate } from "../features/auth/authSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(rehydrate(false));
        localStorage.removeItem('auth-token');
        navigate('/');

    }

  return (
    <nav className="bg-primary-dark p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-white text-xl font-bold">
          <Link to={'/dashboard'} >Collabify</Link> 
        </div>

        {/* Navbar Links */}
        <div onClick={logout} className="flex justify-between gap-2 text-white hover:cursor-pointer">
         <p>Logout</p>
         <IoLogOut className="text-2xl"/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
