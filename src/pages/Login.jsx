
import { useFormik } from 'formik';

// import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../features/auth/authSlice';



const LoginPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(login(values));
        navigate("/dashboard")
        
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-dark">
      <div className='bg-white p-4 rounded-lg text-lg mb-4' >
        <h2>Test Login Details</h2>  
        <p>Email: <span className='text-red-400'>tina@gmail.com</span></p>
        <p>Password: <span className='text-red-400' >tina@12</span></p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 max-w-md w-full">
        <h1 className='text-2xl sm:text-4xl text-center  my-5 ' >Workasana</h1>
        <h2 className="text-lg sm:text-2xl font-semibold text-center mb-6">Log In</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-primary-light text-white rounded-lg"
          >
            Log In
          </button>
      
          <p className='flex justify-center gap-2' >{`Don't have an account?`} <Link className='underline text-blue-400' to={"/signup"}>Signup</Link></p>    
        </form>
        
      </div>
    </div>
    <Toaster/>
    </>
  );
};

export default LoginPage;


// https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png