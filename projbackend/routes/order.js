const express = require('express');
const router = express.Router();


const { getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus } = require('../controllers/order');
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, pushOderInPurchaseList } = require("../controllers/user");
const { getProductById, updateStock } = require("../controllers/product");

// params to grab the id of user and the category
router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("orderId", getOrderById);

// actual routes to create the order
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOderInPurchaseList, updateStock, createOrder);

// actual routes to get all order
router.get("/orders/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

// Actual routes for the status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

// Actual routes for the status updated
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)


module.exports = router;