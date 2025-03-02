import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import Header from "./Header";
import Navbar from './Navbar';

const CollabifyLayout = ({children,heading}) => {
    return(
<div className="bg-primary min-h-screen" >
    <Navbar/>
        <div className="px-12 py-6" >
            <div className="bg-white rounded-lg p-6" >
        <Header heading={heading} />
        <div>
            {children}
        </div>
        </div>
        </div>
        <Toaster/>
        </div>
    )
}

// Define propTypes for the component
CollabifyLayout.propTypes = {
    heading: PropTypes.string.isRequired,  // heading should be a string and is required
    children: PropTypes.node.isRequired,  // children can be any renderable content and is required
};


export default CollabifyLayout;