import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastNotif } from "../App";
const Logout = () => {
    const { notifysuccess, notifyerror} = useContext(ToastNotif)
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();
    useEffect(() => {
        fetch("/logoutuser", {
            credentials: "include",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application"
            }
        }).then((res)=>{
            dispatch({ type: "USER", payload: false });
            history.push("/signin", {replace: true});
            // setvalue(toR + 1);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            else
              notifysuccess("User logged out successfully!");
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    return ( <h6>Logging you out...</h6> );
}
 
export default Logout;