// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({

//     empid: {
//         type: String,
//         unique: true
//     },

//     name: String,

//     email: String,

//     password: String,

//     basicSalary: Number,

//     hra: Number,

//     da: Number,

//     grossSalary: Number

// });

// module.exports = mongoose.model("Employee", employeeSchema);

const mongoose = require("mongoose");

const employeeschema = new mongoose.Schema({

    empid : {
        type: String,
        unique: true
    },

    name: String,

    email: String,

    password: String,

    basicsalary: Number,

    hra: Number,

    da: Number,

    grosssalary: Number,
});

module.exports = mongoose.model("Employee",employeeschema);