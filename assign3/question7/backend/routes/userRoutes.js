const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");

// REGISTER
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return res.json({
            message: "Email already registered"
        });
    }

    const user = new User({
        name,
        email,
        password
    });

    await user.save();

    res.json({
        message: "Registration successful"
    });
});


// LOGIN
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        email,
        password
    });

    if (!user) {
        return res.json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});


// ADD TO CART
router.post("/cart/add", async (req, res) => {

    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    const item = user.cart.find(
        item => item.productId === productId
    );

    if (item) {
        item.quantity++;
    } else {
        user.cart.push({
            productId: productId,
            quantity: 1
        });
    }

    await user.save();

    res.json({
        message: "Product added to cart"
    });
});


// GET CART
router.get("/cart/:userId", async (req, res) => {

    const user = await User.findById(req.params.userId);

    let cart = [];

    for (let item of user.cart) {

        const product = await Product.findById(item.productId);

        if (product) {
            cart.push({
                product: product,
                quantity: item.quantity
            });
        }
    }

    res.json(cart);
});


// REMOVE FROM CART
router.delete("/cart/remove/:userId/:productId", async (req, res) => {

    const user = await User.findById(req.params.userId);

    user.cart = user.cart.filter(
        item => item.productId !== req.params.productId
    );

    await user.save();

    res.json({
        message: "Product removed"
    });
});


// UPDATE CART
router.put("/cart/update", async (req, res) => {

    const { userId, productId, quantity } = req.body;

    const user = await User.findById(userId);

    const item = user.cart.find(
        item => item.productId === productId
    );

    if (item) {
        item.quantity = quantity;
    }

    await user.save();

    res.json({
        message: "Cart updated"
    });
});


module.exports = router;
