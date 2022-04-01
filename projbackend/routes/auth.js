const express = require("express");
const { signup, signin, signout, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require('express-validator');
const router = express.Router();

// signup router
router.post("/signup",
    // express validator
    check("name").isLength({ min: 3 }).withMessage("The name should be at least 3 charactor"),
    check("email").isEmail().withMessage("Please enter a valid email id"),
    check("password").isLength({ min: 3 }).withMessage("The password must be at least 3 charactors")
    , signup)

// signin router
router.post("/signin",
    // express validator
    [check("email").isEmail().withMessage("Please enter a valid email id"),
    check("password").isLength({ min: 3 }).withMessage("The password must be at least 3 charactors")
    ], signin)


router.get("/signout", signout);

// test routes
router.get("/testroute", isSignedIn, (req, res) => {
    res.send("This one is the protected routes and can't be accessed without login")
    // res.json(req.auth) // this is just to show the output that the req.auth gives us the id of the profile
})

module.exports = router;