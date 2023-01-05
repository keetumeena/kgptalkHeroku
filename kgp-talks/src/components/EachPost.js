import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Eachpost = (props) => {
    //setting props to particular variables;
    const post = props.posts;
    const UserData = props.UserData;
    const rr = props.rr;

    //setting necessary states
    const [editedTitle, setEditedTitle] = useState("");
    const [editedPost, setEditedPost] = useState("");
    const [rerender, setRerender] = useState(0);
    const [posts, setPosts] = useState(post);

    
    //handling functions
    const handleLike = async (e) => {
        console.log("handle like executed")
        console.log("postid", e.target.id)
        const res = await fetch("/likepost", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postid: e.target.id })
        })
        const data = await res.json();
        setPosts(data.post);
        console.log(data);
        setRerender(rerender + 1);
    }
    const handleDislike = async (e) => {
        console.log("postid", e.target.id)
        const res = await fetch("/dislikepost", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postid: e.target.id })
        })
        const data = await res.json();
        setPosts(data.post);
        console.log(data);
        setRerender(rerender + 1);
    }
    const handleEdit = (e, title, message) => {
        document.getElementById(e.target.id + "card").style.display = "none";
        document.getElementById("f" + e.target.id).style.display = "flex";
        setEditedTitle(title)
        setEditedPost(message)
    }
    const handleDelete = async (e) => {
        // let newPost = posts.filter((post) => (post.id != id))
        // editposts(newPost)
        // console.log(newPost)
        const res = await fetch("/delpost", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: e.target.id })
        })
        const data = await res.json();
        rr();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/editpost", {
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: e.target.id, title: editedTitle, message: editedPost })
        });
        const data = await res.json();
        setPosts(data.post[0]);
        
        document.getElementById(e.target.id + "card").style.display = "flex";
        document.getElementById("f" + e.target.id).style.display = "none";
        toast.success("Post edited!", {
            position: "top-center"
        });
    }
    return (<> 
    <div className="card text-center" id={posts._id + "card"}>
        <div className="card-header text-white bg-primary" id={posts._id + "title"}>
            {posts.title}
        </div>
        <div className="card-body">
            {posts.message}
            <p>Written By:- {posts.author}</p>
            <div className="postactions">
                <div className="iconsofactions">
                    {!posts.likes.includes(UserData._id) && <i className="far fa-thumbs-up" id={posts._id} onClick={(e) => {
                        handleLike(e)
                    }}></i>}
                    {posts.likes.includes(UserData._id) && <i className="fas fa-thumbs-up highlitedIcon" id={posts._id} onClick={(e) => {
                        handleLike(e)
                    }}></i>}
                    <div className="desc">
                        {posts.likes.length > 0 && posts.likes.length}
                        {posts.likes.length == 0 && "Like"}
                    </div>
                </div >
                <div className="iconsofactions">
                    {!posts.dislikes.includes(UserData._id) && <i className="far fa-thumbs-down" id={posts._id} onClick={(e) => {
                        handleDislike(e)
                    }}></i>}
                    {posts.dislikes.includes(UserData._id) && <i className="fas fa-thumbs-down highlitedIcon" id={posts._id} onClick={(e) => {
                        handleDislike(e)
                    }}></i>}
                    <div className="desc">
                        {posts.dislikes.length > 0 && posts.dislikes.length}
                        {posts.dislikes.length == 0 && "Dislike"}
                    </div>
                </div>
                {posts.author === UserData.name && <div className="iconsofactions">
                    <i className="far fa-edit" id={posts._id} onClick={(e) => {
                        handleEdit(e, posts.title, posts.message)
                    }}></i>
                    <div className="desc">Edit</div>
                </div>}
                {posts.author === UserData.name && <div className="iconsofactions">
                        <i className="fas fa-trash-alt" id={posts._id} onClick={(e) => {
                        handleDelete(e)
                    }}>
                    </i>
                    <div className="desc">Delete</div>
                </div>}
            </div>
        </div>
    </div >
        <div className="card text-center editPost" id={"f" + posts._id}>
            <div className="card-header text-white bg-primary">
                Edit Post
            </div>
            <div className="card-body">
                <form id={posts._id} onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <label>Post Title</label>
                    <input
                        type="text"
                        required
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <label>Post content : </label>
                    <textarea
                        required
                        value={editedPost}
                        onChange={(e) => setEditedPost(e.target.value)}
                    ></textarea>
                    <input type="Submit" value="Save changes" readOnly />
                </form>
            </div>
        </div>
        <ToastContainer />
    </>
    );
}

export default Eachpost;