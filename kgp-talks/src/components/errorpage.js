import { Link } from "react-router-dom";
const Errorpage = () => {
    return ( 
        <div className="overlay">
            <p className="digit404">404</p>
            <div className="messageerrror">
                <div className="unf">The url was not found!!</div>
                <Link className="btn btn-primary" to="/"> Go Back to Home</Link>
            </div>
        </div>
     );
}
 
export default Errorpage;