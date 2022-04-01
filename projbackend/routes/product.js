const express = require("express");
const router = express.Router();


const { getProductById, createProduct, getProduct, getAllProduct, updatePorduct, deleteProduct, photo, getUniqueCategory } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params to grab the id of user and the category
router.param("userId", getUserById);
router.param("productId", getProductById);



// Actual route to create the product in our database
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

// Actual route to grab single product
router.get("/product/:productId", getProduct);

// Actual route to grab all unique product
router.get("/product/photo/:productId", photo);

// Actual route to grab all product
router.get("/products/all", getAllProduct);
router.get("/products/categories", getUniqueCategory);

// Actual route to update product
router.put("/product/update/:productId/:userId", isAdmin, isAuthenticated, isAdmin, updatePorduct)

// Actual route to delete the product
router.delete("/product/:productId/:userId", isSignedIn, isAdmin, isAuthenticated, deleteProduct)



module.exports = router;