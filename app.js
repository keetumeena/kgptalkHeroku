const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json())
// const User = require('./model/userSchema');

app.use(require('./router/auth'))
const PORT = process.env.PORT || 5000;  


// app.get('/about', (req, res)=>{
//     res.send("Welcome to the about page")
// })
// app.get('/contact', (req, res)=>{
//     res.cookie("Testc", "You are hot and amazing")
//     res.send("Welcome to the contact page")
// })
// app.get('/signin', (req, res)=>{
//     res.send("Welcome to the signin page")
// })
// app.get('/signup', (req, res)=>{
//     res.send("Welcome to the signup page")
// })

if (process.env.NODE_ENV == "production") {
    app.use(express.static("kgp-talks/build"));
}

app.listen(PORT, ()=>{
    console.log(`Server running live at Localhost:${PORT}  http://localhost:3000/`)
});