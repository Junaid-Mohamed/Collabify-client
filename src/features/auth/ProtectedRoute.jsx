
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { rehydrate } from "./authSlice";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children})=>{

    const {isAuthenticated} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); 

    useEffect(()=>{
        const token = localStorage.getItem('auth-token');
        if(token){
           dispatch(rehydrate(true)) 
        }
        setLoading(false); // Done with rehydration
    },[dispatch])

    if (loading) {
        return <div>Loading...</div>;
      }
    
      // Redirect unauthenticated users to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
    
    return<>{children}</>
}

export default ProtectedRoute;