const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category")
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

// params to grab the id of user and the category
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// acutal Create routers of the category
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

// acutal Read routers of the category
router.get("/category/:categoryId", getCategory);
router.get("/categories/all", getAllCategory);

// acutal update routers of the category
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

// acutal delete routers of the category
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory);


module.exports = router;
