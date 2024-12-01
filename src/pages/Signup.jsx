
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { resetAuthStatus, signUp } from '../features/auth/authSlice';




const Signup = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {authStatus} = useSelector(state=> state.auth)

    
  const formik = useFormik({
    initialValues: {
    name:'',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required')
    }),
    onSubmit: values => {
    //   handleSignUpWithEmailPassword(values);
    dispatch(signUp(values))
    }
  });

  useEffect(()=>{
    if(authStatus==='success'){
        formik.resetForm();
        setTimeout(()=>{
            navigate('/login')
        },1500)
        dispatch(resetAuthStatus());
    }
},[authStatus,navigate,dispatch,formik])

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-primary-dark">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 max-w-md w-full">
      <h1 className='text-2xl sm:text-4xl text-center  my-5 ' >Workasana</h1>
      <h2 className="text-lg sm:text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
             {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}

          <button type="submit" className="w-full p-3 bg-primary-light hover:bg-primary-dark text-white rounded-lg">Sign Up</button> 
    <p className='flex justify-center gap-2' >Already have an account? <Link className='underline text-blue-400' to={"/login"}>Login</Link></p>    
        </form>
       
      </div>
    </div>
    <Toaster position='top-right' />
    </>
  );
};

export default Signup;