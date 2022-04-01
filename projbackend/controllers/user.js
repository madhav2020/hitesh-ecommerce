
const User = require("../models/user");
const Order = require("../models/order")

// Get user id middleware and store the user id in "req.profile"
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, userId) => {
        if (error || !userId) {
            return res.staus(400).json({
                error: "NO user was found in DB"
            });
        }
        req.profile = userId; //user information(mainly user id) is saved int he req.profile
        next();
    })
}

// get user middleware
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}

// Method to updated user data
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (error, updatedUserData) => {
            if (error) {
                res.status(400).json({
                    message: "Data updation failed",
                    error: error
                })
            }
            updatedUserData.salt = undefined;
            updatedUserData.encry_password = undefined;
            res.status(200).json({
                "Updated User Info": updatedUserData
            })
        }
    );
}

// create the middleware to get the list of all items in the user order list
exports.UserPurchasesList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((error, order) => {
            if (error) {
                return res.status(400).jso({
                    errror: "No Order found in this user account"
                })
            }
            res.status(200).json({
                Order: order
            })
        })
}

// Create the middleware to push to user purchase list in the user account
exports.pushOderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            tracsection_id: req.body.order.tracsection_id
        });
    });

    // Store this info in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (error, purchases) => {
            if (error) {
                return res.status(400).json({
                    error: "UNABLE to save purchases list"
                });
            }
            next();
        }
    );
}