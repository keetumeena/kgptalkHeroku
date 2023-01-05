const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    hall: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // messages:[
    //     {
    //         name: {
    //             type: String,
    //             required: true
    //         },
    //         email: {
    //             type: String,
    //             required: true
    //         },
    //         phone: {
    //             type: Number,
    //             required: true
    //         },
    //         message: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ] ,
    posts: [
        {
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            likes: [
                {
                    type: String,
                    required: true
                }
            ],
            dislikes: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

const postSchema = mongoose.Schema(
        {
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            authorid:{
                type: String,
                required: true
            },
            likes: [
                    {
                    type: String,
                    required: true
                    }
            ],
            dislikes: [
                    {
                    type: String,
                    required: true
                    }
            ]
        }
    );

userSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

// userSchema.methods.addMessage = async function (name, email, phone, message){
//     try{
//         console.log(this.messages)
//         this.messages = this.messages.concat({ name, email, phone, message})
//         await this.save();
//         return this.messages;
//     }catch(error)
//     {
//         console.log(error)
//     }
// }
userSchema.methods.addPost = async function (title, message, author, authorid){
    try{
        // console.log(this.messages)
        // this.posts = this.posts.concat({title, message, author})
        // await this.save();
        Post.insertMany({title, message, author, authorid});
        return this.posts;
    }catch(error)
    {
        console.log(error)
    }
}


postSchema.methods.likeaPost = async function (userid) {
try {
        const likesofPost = this.likes;
    if (likesofPost.includes(userid)) {
        this.likes.splice(likesofPost.indexOf(userid), 1);
        await this.save();
        console.log(this.likes)
        return 0;
    }
    else {
        if(this.dislikes.includes(userid)){
            this.dislikes.splice(this.dislikes.indexOf(userid), 1);
        }

        this.likes = this.likes.concat(userid)
        await this.save();
        return 1;
    }
} catch (err) {
    console.log(err);
}
}

postSchema.methods.dislikeaPost = async function (userid) {
    try {
        const dislikesofPost = this.dislikes;
        if (dislikesofPost.includes(userid)) {
            this.dislikes.splice(dislikesofPost.indexOf(userid), 1);
            await this.save();
            console.log(this.dislikes)
            return 0;
        }
        else {
            if (this.likes.includes(userid)) {
                this.likes.splice(this.likes.indexOf(userid), 1);
            }
            this.dislikes = this.dislikes.concat(userid)
            await this.save();
            return 1;
        }
    } catch (err) {
        console.log(err);
    }
}


const User = mongoose.model('KGPIAN', userSchema)
const Post = mongoose.model('POST', postSchema)
module.exports = {User, Post};