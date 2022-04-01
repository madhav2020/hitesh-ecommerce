// app.js
const getAllUserRoute = require("parthname")
app.use("/api", getAllUserRoute)


// routes>user.js
const express = require("express");
const router = express.Router();
router.get("/allusers", getAllUsers);





// contraller>user.js

exports.getAllUsers = (req, res)=>{
    User.find().exec((error, userData)=>{
        if (error || !userData) {
            return res.status(400).json({
                message: "NO user found"
            });
        }
        res.status(200).json({
            allusers: userData
        });
    });
};