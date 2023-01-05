import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";
import React from 'react';
import { ToastNotif } from "../App";
// import { toast, ToastContainer } from 'react-toastify';


// toast.configure();
const Signin = () => {
    const { state, dispatch } = useContext(UserContext)
    const { notifysuccess, notifyerror } = useContext(ToastNotif)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle SUbmit")
        const res = await fetch("/signinuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Email, password: Password })
        });
        const data = await res.json();
        console.log(res, data)
        if (res.status === 400 || !data) {
            // window.alert("Invalid credentials")
            notifyerror("Invalid credentials");
        }
        else {
            dispatch({ type: "USER", payload: true })
            // window.alert("Login Successful");
            notifysuccess("User logged in successfully!");
            history.push("/")
        }
    }
    return (
        <div className="signin">
            <div className="card text-center signincard">
                <div className="card-header text-white bg-info fw-bold">
                    Signin
                </div>
                <form className="card-body" method="POST" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="text" required value={Email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <label>Password</label>
                    <input type="password" required value={Password} onChange={(e)=>{setPassword(e.target.value)}} />
                    <input type="submit" value="SignIn" className="bg-primary text-white" />
                </form>
            </div>
        </div>
    );
}

export default Signin;