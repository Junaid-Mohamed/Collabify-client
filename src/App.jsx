
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/create-task')
  },[navigate]) 
  return (
    <>
    </>
  )
}

export default App
