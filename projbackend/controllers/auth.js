
const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const epxpressJwt = require("express-jwt")


// signup function exports
exports.signup = (req, res) => {
    // express validator custom message 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    // check if the user already exist with this email id at the time of signup itself
    const { name, email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error) {
            res.status(400).json({
                eroor: error
            })
        }
        if (user) {
            return res.status(409).json({
                Message: "A user with this email already exist please login to continue"
            });
        }
    });

    // if the email id doesn't exist in our database let's save it as new user
    user.save((error, userData) => {
        if (error) {
            return res.status(400).json({
                error: "Fail to save user data in our Database"
            });
        }
        if (userData) {
            return res.status(200).json({
                userInfo: {
                    name: user.name, // we can also write userData.name (userData is the return value given by the save function in return)
                    lastName: user.lastName,
                    email: user.email, // we can also write userData.email
                    Id: user._id // we can also write userData._id
                }
            });
        }
    });
}

// signin funciton exports
exports.signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    
    // Check first if the user exist in our database or not
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "USER email doesn't exist please signup first"
            });
        }
        // Authenticate the user with the email and passwrod 
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password do not match!"
            });
        }
        // Create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        // put token in cookie
        res.cookie("token", token, { expire: new Date() + 90 });
        // send response to frontend
        const { _id, name, email, role } = user;
        return res.json({
            token,
            user: { _id, name, email, role }
        });
    });
}

// signout funciton exports
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "You are succefully signout!"
    });
}


// protected routes
exports.isSignedIn = epxpressJwt({
    secret: process.env.SECRET,
    userProperty: "auth" // here the userPoperty: "auth" will store the profile id of the user in "auth"
});

// Custom middleware
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile_id == req.auth_id
    if (!checker) {
        res.status(403).json({
            error: "ACCESS DENIED!"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.satatus(403).json({
            Eroor: "You are not a admin, ACCESS DENIED!"
        });
    }
    next();
}