const User = require("../modules/user");
const jwt = require("jsonwebtoken");
const epxpressJwt = require("express-jwt")


// signup function for the routes
exports.signup = (req, res) => {
    const user = new User(req.body);

    // User Validation before the user proceed to signup
    const { email } = req.body;
    User.findOne({ email }, (error, userData) => {
        if (error) {
            return res.status(400).json({
                eroor: error
            });
        }
        if (userData) {
            return res.status(422).json({
                Message: "A user with this email already exist, you can proceed signin to continue"
            });
        }
    })

    // Save User data if everything is fine
    user.save((error, user) => {
        if (error) {
            return res.status(400).json(error)
        }
        res.status(200).json({
            user: user
        });
    })
}


// Exports Signin Function for the routes
exports.signin = (req, res) => {
    const { email, password } = req.body;
    // Check first if the user exist in our database or not
    User.findOne({ email }, (eroor, userData) => {
        if (eroor) {
            return res.status(400).json({
                error: eroor
            });
        }
        if (!userData) {
            return res.status(404).json({
                message: "Hey this email id is not yet registered please signup first!"
            });
        }
        // Authenticate the user with the email and passwrod 
        if (!userData.authenticate(password)) {
            return res.status(400).json({
                message: "Email and password do not match"
            });
        }
        // Create json web token
        const token = jwt.sign({ _id: userData._id }, process.env.SECRET);
        // set the cookie
        res.cookie("token", token, { expire: new Date() + 90 });
        // send req to frontend
        const { _id, name, email, role } = userData
        res.status(200).json({
            token,
            userInfo: { _id, name, email, role }
        });
    })
}

// signout function for the routes
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "you are successfully logout of this page"
    });
}

// protected routes
exports.isSignedin = epxpressJwt({
    secret: process.env.SECRET, algorithms: ['RS256'],
    userDataProperty: "auth" // here the userPoperty: "auth" will store the profile id of the user in "auth"
});

// Middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile_id == req.auth_id;
    if (!checker) {
        return res.status(400).json({
            message: "ADMIN ACCESS DENIED!"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).jso({
            message: "Your are not ADMIN, acess denid!"
        });
    }
    next();
}