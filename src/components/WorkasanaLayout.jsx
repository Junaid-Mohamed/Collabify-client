import PropTypes from 'prop-types';
import Header from "./Header";
import Navbar from './Navbar';

const WorkasanaLayout = ({children,heading}) => {
    return(
<div className="bg-primary min-h-screen" >
    <Navbar/>
        <div className="p-12" >
            <div className="bg-white rounded-lg p-6" >
        <Header heading={heading} />
        <div>
            {children}
        </div>
        </div>
        </div>
        </div>
    )
}

// Define propTypes for the component
WorkasanaLayout.propTypes = {
    heading: PropTypes.string.isRequired,  // heading should be a string and is required
    children: PropTypes.node.isRequired,  // children can be any renderable content and is required
};


export default WorkasanaLayout;