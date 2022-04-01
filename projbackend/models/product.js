const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; // this we are exporting to use the ObjectId of other model in this case the ObjectId of Category Model

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    },
    description: {
        type: String,
        required: true,
        maxlength: 1500,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        maxlength: 40,
        trim: true
    },
    // linking up the category with the category created
    category: {
        ref: "Category", //here the ref Category means pull the ObjectId of the Category model
        type: ObjectId,
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: Buffer,
        contentType: String
    }
}, {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema)