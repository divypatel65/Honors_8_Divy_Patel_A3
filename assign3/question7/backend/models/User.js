const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },

    cart: [
        {
            productId: String,
            quantity: Number
        }
    ]
});
module.exports = mongoose.model("User", userSchema);