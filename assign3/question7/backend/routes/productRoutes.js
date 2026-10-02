const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// GET ALL PRODUCTS
router.get("/", async (req, res) => {

    const products = await Product.find()
        .populate("category");

    res.json(products);
});


// ADD PRODUCT
router.post("/", async (req, res) => {

    const {
        name,
        price,
        image,
        description,
        category
    } = req.body;

    const product = new Product({
        name,
        price,
        image,
        description,
        category
    });

    await product.save();

    res.json({
        message: "Product added",
        product
    });
});


// DELETE PRODUCT
router.delete("/:id", async (req, res) => {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: "Product deleted"
    });
});


module.exports = router;
