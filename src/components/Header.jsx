import PropTypes from "prop-types";

const Header = ({heading}) => {
    return(
        <header className="py-6 text-center" >
             <h1 className="font-mono font-semi-bold text-3xl" > {heading}</h1>
             <hr  className="my-4 border-gray-400 "/>
        </header>
    )
}

Header.propTypes = {
    heading: PropTypes.string.isRequired,
}

export default Header;