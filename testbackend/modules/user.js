
const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 40
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    userinfo:{
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        trim: true,
        required: true
    },
    salt:{
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, 
{ timestamps: true }
);


// setting some mongoose methods
userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }
}


// setting up the virtuals 
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    })



module.exports = mongoose.model("User", userSchema)