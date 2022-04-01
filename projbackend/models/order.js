const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartShcema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
},
    { timestamps: true }
);

const ProductCart = mongoose.model("ProductCart", ProductCartShcema);


const OrderSchema = new mongoose.Schema({
    product: [ProductCartShcema],
    transaction_id: {},
    account: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Received",
        // enum help us in setting the default value to select by the user
        enum: ["Cancelled", "Delevered", "Shipped", "Processing", "Received"] 
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User",
    }
},
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart }