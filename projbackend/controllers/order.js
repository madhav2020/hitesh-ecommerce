const { Order, ProductCart } = require("../models/order")

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price") // in the order we are populating name of the product and their price
        .exec((error, orderId) => {
            if (error) {
                return res.status(400).json({
                    Messae: "order failed to save in DB",
                    Error: error
                });
            }
            req.order = orderId;
            res.status(200).json({
                Message: req.order
            });
            next();
        });
};

// methods to create the product
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, orderListData) => {
        if (error) {
            return res.status(400).json({
                Message: "Order is failed to save in the DB",
                Error: error
            });
        }
        res.status(200).json({
            "Order List": orderListData
        })
    });
};

// method to get all order list
exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((error, allOrderData) => {
            if (error) {
                return res.status(400).json({
                    Message: "No Orders found in DB",
                    Error: error
                })
            }
            res.status(200).json({
                "all Orders": allOrderData
            });
        });
};

// method to get order status
exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValue);
};

// method to update the status
exports.updateStatus = (req, res) =>{
    Order.update(
        {_id : req.body.orderId},
        {$set: {status: req.body.status}},
        (error,updatedData) =>{
            if(error){
                return res.status(400).json({
                    Message: "Can't update order status"
                })
            }
            res.status(200).json({
                "Udpated Data": updatedData 
            });
        }
    )
};