
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ProtectedRoute from './features/auth/ProtectedRoute.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import LoginPage from './pages/Login.jsx'
import ProjectManagement from './pages/ProjectManagement.jsx'
import Report from './pages/Report.jsx'
import Signup from './pages/Signup.jsx'
import TaskCreation from './pages/TaskCreation.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import TeamCreation from './pages/TeamCreation.jsx'
import TeamManagement from './pages/TeamManagement.jsx'
import store from './redux/store.js'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/signup',
    element: <Signup/>
  },
  {
    path:'/login',
    element: <LoginPage/>
  },{
    path:'/reports',
    element: <ProtectedRoute><Report/></ProtectedRoute>
  },
  {
    path:'/create-task',
    element: <ProtectedRoute><TaskCreation/></ProtectedRoute>
  },
  {
    path:'/dashboard',
    element: <ProtectedRoute><Dashboard/></ProtectedRoute>
  },
  {
    path:'/teams',
    element: <ProtectedRoute><TeamManagement/></ProtectedRoute>
  },
  {
    path:'projects/:project',
    element: <ProtectedRoute><ProjectManagement/></ProtectedRoute>
  },
  {
    path:'/create-team',
    element: <ProtectedRoute><TeamCreation/></ProtectedRoute>
  },
  {
    path:'/task/:taskId',
    element: <ProtectedRoute><TaskDetails/></ProtectedRoute>
  },


])


createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} >
    
    </RouterProvider>
    </Provider>
)
