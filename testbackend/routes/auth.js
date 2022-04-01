const express = require("express");
const { signup, signin, signout, isAdmin, isSignedin } = require("../controllers/auth");
const { signupValidator, userValidationResult, signinValidator } = require("../validators/authValidator");

const router = express.Router();


router.post("/signup", signupValidator, userValidationResult, signup)
router.post("/signin", signinValidator, userValidationResult, signin)
router.get("/signout", signout)

router.get("/testroutes", isSignedin, (req, res)=>{
    res.status(200).json({
        message: " you are on the protected routes"
    })
})

module.exports = router;