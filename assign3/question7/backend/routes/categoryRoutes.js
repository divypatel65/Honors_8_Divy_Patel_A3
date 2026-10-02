const express = require("express");
const router = express.Router();

const Category = require("../models/Category");


// GET ALL CATEGORIES
router.get("/", async (req, res) => {

    const categories = await Category.find();

    res.json(categories);
});


// ADD CATEGORY
router.post("/", async (req, res) => {

    const { name, parent } = req.body;

    const category = new Category({
        name,
        parent: parent || null
    });

    await category.save();

    res.json({
        message: "Category added",
        category
    });
});


// DELETE CATEGORY
router.delete("/:id", async (req, res) => {

    await Category.findByIdAndDelete(req.params.id);

    res.json({
        message: "Category deleted"
    });
});


module.exports = router;
