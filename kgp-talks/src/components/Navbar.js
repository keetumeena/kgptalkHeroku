import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const getdataanddispatch = async()=>{
        try {
            const res = await fetch("/getdata", {
                credentials: "include",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application"
                }
            })

            const data = await res.json();
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            // console.log(res, data);
            dispatch({ type: "USER", payload: true })
            // setUserData(data)
            // setEditedUsername(data.name);

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getdataanddispatch();
    }, [])
    const RenderMenu = ()=>{
        if(state){
            return(
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">DashBoard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                    </li>
                </>
            )
        }
        else{
            return(
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">DashBoard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/signin">SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
                    </li>
                </>
            )
        }
    }
    return (<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <p className="navbar-brand">KGP Talks</p>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <RenderMenu/>
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;