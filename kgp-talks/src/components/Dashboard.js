import {useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Newpost from "./Newpost"
import Postsdisplay from "./Posts"

const Dashboard = () => {
    // const [Posts, setPosts] = useState([
    //     { title: "Template post #1", body: "This is body of Template Post #1", username: "User 1", likes: 0, dislikes: 0, id: 1 },
    //     { title: "Template post #2", body: "This is body of Template Post #2", username: "User 2", likes: 0, dislikes: 0, id: 2 },
    //     { title: "Template post #3", body: "This is body of Template Post #3", username: "User 3", likes: 0, dislikes: 0, id: 3 }
    // ]);
    const history = useHistory();
    const [UserData, setUserData] = useState({});
    const [posts, setposts] = useState();
    const [updateCounter, setUpdateCounter] = new useState(0);
    const forcetorerender = async() => {
        // console.log("Request received to rerender")
        getPosts();
        setUpdateCounter(updateCounter + 1);
    }
    const shouldrenderdashboard = async()=>{
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
            // if(JSON.stringify(data) !== JSON.stringify(UserData))
                setUserData(data)
            console.log(res, data);
            // setUserData(data)
            // setEditedUsername(data.name);

        } catch (err) {
            console.log(err);
            history.push("/signin");
        }
    }
    const getPosts = async () => {
        const res = await fetch("/allposts", {
            credentials: "include",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application"
            }
        });
        const data = await res.json();
        // if (JSON.stringify(data.all) != JSON.stringify(posts)) {
            setposts(data.all);
        if (res.status != 200 || !data)
            console.log("error");

            // return(data.all)
    }
    useEffect(() => {
        shouldrenderdashboard();
        // getPosts()
        // console.log("User data = ",UserData)
    }, [updateCounter])
    return (
        <div className="dashboard">
            <Newpost rr={forcetorerender} user={UserData} getPosts = {getPosts}/>
            <hr />
            <Postsdisplay posts = {posts}/>
        </div>
    );
}

export default Dashboard;