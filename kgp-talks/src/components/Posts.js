import {useEffect, useState } from "react";
import Eachpost from "./EachPost";
const Postsdisplay = (prop) => {
    const post = prop.posts;

    const [posts, setposts] = useState();
    const [UserData, setUserData] = useState({});
    const [updateCounter, setUpdateCounter] = new useState(0);
    const forcetorerender = () => {
        // console.log("Request received to rerender")
        setUpdateCounter(updateCounter + 1)
    }
    const getpostsinner = async ()=>{
        const res = await fetch("/allposts", {
            credentials: "include",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application"
            }
        });
        const data = await res.json();
        if(JSON.stringify(data.all) != JSON.stringify(posts)){
            setposts(data.all);
        }
        if (JSON.stringify(data.rootuser) != JSON.stringify(UserData)){
            setUserData(data.rootuser);
        }
        if(res.status!=200 || !data)
            console.log("error");
    }
    useEffect(() => {
        getpostsinner();
        // const gpresult = getPosts();
        // console.log("posts from dashboard: ", gpresult);
    })
    return (
        <div className="seeposts">
            <div className="card text-center">
                <div className="card-header text-white bg-info fw-bold hoverp">
                    Posts
                </div>
            </div>
            {
              posts &&  posts.map((posts) => (
                    <div key={posts._id}>
                        <Eachpost posts={posts} UserData={UserData} rr={forcetorerender}/>
                    </div>
                ))

            }
        </div >
    );
}

export default Postsdisplay;