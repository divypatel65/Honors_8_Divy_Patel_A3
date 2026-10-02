const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("./libs/db");

const Employee = require("./models/Employee");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Leave = require("./models/Leave");

const app = express();

app.set("view engine","ejs");

app.use(cors());

app.use(express.json());


app.use(express.urlencoded({extended : true}));

app.use(session({
    secret: "erp-secret",
    resave: false,
    saveUninitialized: false
}));

//admin login
app.get("/",function(req,res){
    res.render("login",{
        error:""
    });
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(username === "admin" && password === "admin123")
    {
           req.session.admin = username;
           res.redirect("/dashboard");
    }
    else{
        res.render("login",{
            error: "Invalid username or Password"
        });
    }

});

//check admin check
function checklogin(req,res,next){
    if(req.session.admin)
    {
        next();
    }
    else{
        res.redirect("/");
    }
}

//dashboard
app.get("/dashboard",checklogin,async function(req,res){
    const employees = await Employee.find();
    res.render("dashboard",{
        employees:employees
    });
});

//add employee
app.get("/add",checklogin,function(req,res){
    res.render("add");
})

app.post("/add",checklogin,async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const basicsalary=Number(req.body.basicsalary);

    //generate emp id
    const count = await Employee.countDocuments();
    const empid = "EMP" + String(count+1).padStart(3,"0");
    // const empid="EMP"+Date.now();

    //generate password
    const plainPassword = Math.random().toString(36).slice(-8);

    const encryptedPassword = await bcrypt.hash(plainPassword, 10);

    const basic = Number(basicsalary);
    const hra = basic * 0.20;
    const da = basic * 0.10;
    const grosssalary = basic+hra+da;

    //create employee

    const employee = new Employee({
        empid: empid,
        name: name,
        email: email,
        password: encryptedPassword,
        basicsalary:basic,
        hra:hra,
        da:da,
        grosssalary:grosssalary
    });
    await employee.save();

     //SEND EMAIL

    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: "divyypatel04@gmail.com",
            pass: "fmtd cifs ubae bfrc"
        }

    });

    await transporter.sendMail({

        from: "divyypatel04@gmail.com",

        to: email,

        subject: "ERP Employee Account",

        text:
`Hello ${name},

Your employee account has been created.

Employee ID: ${empid}
Password: ${plainPassword}

Please keep these details safe.`

    });

    res.redirect("/dashboard");

});

//edit employee
app.get("/edit/:id",checklogin,async function (req,res) {

    const employee = await Employee.findById(req.params.id);

    res.render("edit",{
        employee:employee
    });
});

app.post("/edit/:id",checklogin,async function (req,res) {
    const name = req.body.name;
    const email = req.body.email;
    const basicsalary=Number(req.body.basicsalary); 

    const basic=Number(basicsalary);
    const hra = basic * 0.20;
     const da = basic * 0.10;
    const grosssalary = basic+hra+da;

   await Employee.findByIdAndUpdate(req.params.id,{
    name: name,
    email: email,
    basicsalary: basic,
    hra: hra,
    da: da,
    grosssalary: grosssalary
});

    res.redirect("/dashboard");
    
});


//delete employee
app.get("/delete/:id",checklogin,async function(req,res){
    await Employee.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard");
})

app.get("/logout",function(req,res){
    req.session.destroy(function(){
        res.redirect("/");
    })
})

app.post("/employee/login", async (req, res) => {

    const { empid, password } = req.body;

    // Find employee
    const employee = await Employee.findOne({
        empid: empid
    });

    if (!employee) {
        return res.json({
            message: "Employee not found"
        });
    }

    // Check password
    const match = await bcrypt.compare(
        password,
        employee.password
    );

    if (!match) {
        return res.json({
            message: "Invalid password"
        });
    }

    // Create JWT
    const token = jwt.sign(
        {
            empid: employee.empid
        },
        "employee-secret-key",
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login successful",
        token: token
    });

});
// CHECK JWT
function checkEmployee(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {

        return res.status(401).json({
            message: "Please login first"
        });

    }

    try {

        const decoded = jwt.verify(
            token,
            "employee-secret-key"
        );

        req.empid = decoded.empid;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid token"
        });

    }

}
app.get(
    "/employee/profile",
    checkEmployee,
    async (req, res) => {

        const employee = await Employee.findOne({
            empid: req.empid
        }).select("-password");

        res.json(employee);

    }
);
app.post(
    "/employee/leave",
    checkEmployee,
    async (req, res) => {

        const {
            date,
            reason,
            grant
        } = req.body;

        const leave = new Leave({

            empid: req.empid,

            date: date,

            reason: reason,

            grant: grant

        });

        await leave.save();

        res.json({
            message: "Leave added successfully"
        });

    }
);
app.get(
    "/employee/leave",
    checkEmployee,
    async (req, res) => {

        const leaves = await Leave.find({
            empid: req.empid
        });

        res.json(leaves);

    }
);

app.listen(3000,function(){
    console.log("Server running on http://localhost:3000");
});

