// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/erpdb")
//     .then(() => {
//         console.log("MongoDB Connected");
//     })
//     .catch(err => {
//         console.log(err);
//     });

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/erpdb")

.then(()=>{
    console.log("Mongodb connected");
})
.catch(()=>{
    colsole.log("error");
})