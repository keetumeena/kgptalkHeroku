import { useContext, useEffect, useState } from "react";
import { ToastNotif } from "../App";
const Newpost = (props) => {
    
    // const posts = props.posts;
    // const editposts = props.editpost;
    const rr = props.rr;
    const user = props.user;
    const { notifysuccess, notifyerror} = useContext(ToastNotif);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedPost, setEditedPost] = useState("");
    // const [editedUsername, setEditedUsername] = useState("");
    
    // const [UserData, setUserData] = useState(user);

    // setUserData(user)
    // const [posts, setposts] = useState();
    // const { state, dispatch } = useContext(PostContext);


    // const gatherUserinfo = async () => {
    //     try {
    //         const res = await fetch("/getdata", {
    //             credentials: "include",
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application"
    //             }
    //         })

    //         const data = await res.json();
    //         if (!res.status === 200) {
    //             const error = new Error(res.error);
    //             throw error;
    //         }
    //         console.log(res, data);
    //         setUserData(data)
    //         // setEditedUsername(data.name);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        // gatherUserinfo();
    },[])
    const handleCreate = () => {
        document.getElementsByClassName("creatPostForm")[0].style.display = "block";
        setEditedTitle("");
        setEditedPost("");
        // setEditedUsername("");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(UserData);
        console.log("user", user);
        const res = await fetch("/newpost",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: editedTitle, message: editedPost, author: user.name })
        });
        const data = await res.json();

        if(res.status!=201 || !data)
            notifyerror("Error in submitting post");
        else
            notifysuccess("Post submitted successfully");
            // window.alert("Post submitted successfully")

        // dispatch({type: "GETPOSTS"})
        // Postsdisplay.getposts();
        // let newPost = { title: editedTitle, body: editedPost, username: UserData.name, likes: 0, dislikes: 0, id: posts.length + 1 }
        // // console.log(newPost)
        // let editedpostlist = posts;
        // editedpostlist.push(newPost);
        // editposts(editedpostlist);
        // console.log(posts)
        document.getElementsByClassName("creatPostForm")[0].style.display = "none";
        rr();
        // getPost();
        // console.log(rr);
    }
    return (
        <div className="addpost">
            <div className="card text-center">
                <div className="card-header text-white bg-info fw-bold hoverp" onClick={handleCreate}>
                    Create a new Post
                </div>
                <div className="card-body creatPostForm">
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input
                            type="text"
                            required
                            value={user.name}
                            disabled
                        />
                        <label>Post Title</label>
                        <input
                            type="text"
                            required
                            value={editedTitle}
                            onChange={
                                (e) => {
                                    setEditedTitle(e.target.value)
                                }}
                        />
                        <label>Post content : </label>
                        <textarea
                            required
                            value={editedPost}
                            onChange={
                                (e) => {
                                    setEditedPost(e.target.value)
                                }}
                        ></textarea>
                        <input type="Submit" value="Share" className="bg-primary text-white" readOnly />
                        <div className="bg-danger text-white hoverp" onClick={() => {
                            document.getElementsByClassName("creatPostForm")[0].style.display = "none";
                        }}>Cancel</div>
                    </form>
                </div>
            </div>
        </div>);
}

export default Newpost;