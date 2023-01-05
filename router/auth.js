const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate')
const router = express.Router();
const cookiep = require("cookie-parser");
require('../db/conn')
const {User, Post} = require('../model/userSchema')
router.use(cookiep())
// router.get('/', (req, res)=>{
//     res.send("Hello world: data sent from auth.js router")
// })
router.post('/register', async (req, res)=>{
    const {name, email, phone, roll, hall, password, cpassword} = req.body;
    if (!name || !email || !phone || !roll ||!hall || !password || !cpassword){
        return res.status(422).json({error: "No field can be empty"})
    }
    try{
        const userExists = await User.findOne({ 'email': email });
        if (userExists) {
            return res.status(422).json({ "error": "A User with same email ID exists " })
        } else if (password != cpassword)
            return res.status(422).json({ "error": "Password and confirm password don't match" })
        const user = new User({ name, email, phone, roll, hall, password, cpassword })
        await user.save();
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch(err){
        console.log(err)
    }
})
router.post('/signinuser', async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({error: "Insufficient credentials found"})
        }
        const userLogin = await User.findOne({email: email});
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password)
            if (isMatch){
                const token = await userLogin.generateAuthToken()
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now()+ 25892000000),
                    httpOnly: true
                });
                return res.json({message: "User logged in successfully"})
        }
        else
            return res.status(400).json({error: "Login error: Invalid credentials"})
        }
        else
            return res.status(400).json({ error: "Login error: Invalid credentials" })
    }
    catch(err){
        console.log(err)
    }
})

router.get('/about', authenticate ,(req, res)=>{
    res.send(req.rootUser);
})

router.get('/getdata', authenticate, (req, res)=>{
    res.send(req.rootUser)
})

// router.post('/contact', authenticate ,async(req, res) => {
//     try{
//         const {name, email, phone, message} = req.body;
//         if (!name || !email || !phone || !message){
//         console.log("Error in contact form")
//         return res.json({error: "Kindly fill the application form"})
//         }

//         const userContact = await User.findOne({ _id: req.userID});

//         if(userContact){
//             const usermessage = await userContact.addMessage(name, email, phone, message)
//             await userContact.save();
//             res.status(201).json({message: "Message sent successfully"})
//         }
//     }catch(err){
//         console.log(err);
//     }
// })

router.post("/newpost", authenticate, async (req, res)=>{
    try{
        const {title, message, author} = req.body
        if (!title || !message || !author){
            console.log("Error in post form")
            return res.json({error: "Kindly fill the application form"})
        }
        const userPost = await User.findOne({ _id: req.userID });
        if(userPost){
            const usermessage = await userPost.addPost(title, message, author, req.userID)
            await userPost.save();
            res.status(201).json({message: "Post created successfully"})
        }

    }
    catch(err){
        console.log(err)
    }
} );

router.get("/allposts", authenticate ,async (req, res) => {
        const posts = await Post.find({});
    res.status(200).json({ all: posts, rootuser: req.rootUser})
})

router.post("/onepost", async (req, res)=>{
    try{
        const post = await Post.find({_id: req.body.id});
        if(post)
           return res.send({post: post});
        else
           return res.status(404).json("Couldn't find post");
    }catch(e){
        console.log(e);
        return res.status(404).json("Couldn't find post");
    }
})
router.post("/likepost", authenticate, async (req, res)=>{
    const posttolike = await Post.findOne({ _id: req.body.postid });
    if(posttolike){
        // console.log("Post : ", posttolike);
        const likeorremove = await posttolike.likeaPost(req.userID);
        if(likeorremove==1)
            return res.status(200).json({ message: "post liked successfully", post: posttolike })
        else
            return res.status(200).json({ message: "post supposed to be removed", post: posttolike })
        
    }
    else
    return res.status(200).json({message: "Post was not found"})
    
})

router.post("/dislikepost", authenticate, async (req, res) => {
    const posttodislike = await Post.findOne({ _id: req.body.postid });
    if (posttodislike) {
        console.log("Post : ", posttodislike);
        const likeorremove = await posttodislike.dislikeaPost(req.userID);
        if (likeorremove == 1)
            return res.status(200).json({ message: "post disliked successfully", post: posttodislike })
        else
            return res.status(200).json({ message: "post supposed to be removed", post: posttodislike })

    }
    else
        return res.status(200).json({ message: "Post was not found" })

})

router.put("/editpost", authenticate ,async(req, res)=>{
    const {id, title, message} = req.body;
    const post = await Post.updateOne({_id: id}, {
        $set:{
            title: title,
            message: message
        }
    });
    const changedpost = await Post.find({_id: id});
    // console.log(post)
    // console.log("Update request received");
    res.status(200).json({message: "Update request success", post: changedpost});
})
router.delete("/delpost", async(req, res)=>{
    const id = req.body.id;
    await Post.deleteOne({_id: id});
    res.status(200).json({message: "Post deleted successfully"});
})

router.get("/logoutuser", (req, res)=>{
    try{
    res.clearCookie("jwtoken", {path: "/"});
    return res.status(200).json({message: "User logged off successfully!"})
    }catch(err){
        console.log(err);
        return res.status(404).json({message: "User is not logged in"})
    }
})



module.exports = router;