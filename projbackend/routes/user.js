const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById, getUser, updateUser, UserPurchasesList } = require("../controllers/user");

// params to grab the id of the user
router.param("userId", getUserById);

// users actual routers
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put("/oreders/user/:userId", isSignedIn, isAuthenticated, UserPurchasesList);

module.exports = router;