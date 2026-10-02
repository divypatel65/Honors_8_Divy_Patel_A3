const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req, res) => {
    res.send("Shopping Cart Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
