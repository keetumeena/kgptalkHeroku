import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ToastNotif } from "../App";
const Signup = () => {
    const history = useHistory();
    const { notifysuccess, notifyerror} = useContext(ToastNotif);
    const [userInfo, setUserInfo] = useState({ name: "", email: "", phone:"", roll:"", hall:"", password:"", cpassword:"" })
    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, phone, roll, hall, password, cpassword } = userInfo;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, phone, roll, hall, password, cpassword
            })
        });
        const data = await res.json();
        console.log(data, res)
        if (res.status === 422 || !data) {
            // window.alert("Invalid registration");
            notifyerror(data.error);
            // console.log("Invalid reg");
        }
        else {
            // window.alert("successful registration");
            notifysuccess("successful registration");
            // console.log("success reg");
            history.push("/signin");
        }
    }
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUserInfo({...userInfo, [name]: value});
    }
    return (<div className="signup positnabsolute">
        <div className="card text-center">
            <div className="card-header text-white bg-info fw-bold">
                Signup
            </div>
            <form className="card-body" onSubmit={handleSignUp}>
                <label>Name</label>
                <input type="text" required name="name" onChange={handleInput} />
                <label>Email</label>
                <input type="email" required name="email" onChange={handleInput} />
                <label>Phone Number</label>
                <input type="number" required name="phone" onChange={handleInput} />
                <label>Kgp Roll No: </label>
                <input type="text" required name="roll" onChange={handleInput}/>
                <label>Hall of Residence</label>
                <input type="text" required name="hall" onChange={handleInput}/>
                <label>Password</label>
                <input type="password" required name="password" onChange={handleInput} />
                <label>Confirm Password</label>
                <input type="password" required name="cpassword" onChange={handleInput} />
                <input type="submit" value="SignUp" className="bg-primary text-white" />
            </form>
        </div>
    </div>);
}

export default Signup;