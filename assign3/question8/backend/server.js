const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const StudentModel = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());


// DATABASE CONNECTION
const sequelize = new Sequelize(
    "studentdb",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql"
    }
);


// STUDENT MODEL
const Student = StudentModel(sequelize);


// CREATE TABLE
sequelize.sync()
.then(() => {
    console.log("Database connected");
})
.catch((error) => {
    console.log(error);
});


// ===============================
// CREATE STUDENT
// ===============================

app.post("/students", async (req, res) => {

    const { name, email, age } = req.body;

    const student = await Student.create({
        name: name,
        email: email,
        age: age
    });

    res.json(student);
});


// ===============================
// GET ALL STUDENTS
// ===============================

app.get("/students", async (req, res) => {

    const students = await Student.findAll();

    res.json(students);
});


// ===============================
// UPDATE STUDENT
// ===============================

app.put("/students/:id", async (req, res) => {

    const { name, email, age } = req.body;

    await Student.update(
        {
            name: name,
            email: email,
            age: age
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

    res.json({
        message: "Student updated"
    });
});


// ===============================
// DELETE STUDENT
// ===============================

app.delete("/students/:id", async (req, res) => {

    await Student.destroy({
        where: {
            id: req.params.id
        }
    });

    res.json({
        message: "Student deleted"
    });
});


// ===============================
// START SERVER
// ===============================

app.listen(3000, () => {

    console.log(
        "Server running at http://localhost:3000"
    );

});