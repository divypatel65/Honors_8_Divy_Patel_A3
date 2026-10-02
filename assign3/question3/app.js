const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: false
    })
);

// Login
app.get("/login", (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input name="username" placeholder="Username">
            <input name="password" placeholder="Password">
            <button>Login</button>
        </form>
    `);
});

app.post("/login", (req, res) => {
    if (req.body.username === "admin" &&
        req.body.password === "1234") {

        req.session.user = req.body.username;
        res.send("Login successful");
    } else {
        res.send("Invalid login");
    }
});

// Protect routes
function auth(req, res, next) {
    if (req.session.user)
        next();
    else
        res.send("Please login first");
}

// Protected Route 1
app.get("/home", auth, (req, res) => {
    res.send("Home Page");
});

// Protected Route 2
app.get("/profile", auth, (req, res) => {
    res.send("Profile Page");
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logout successful");
});

app.listen(3000, () => {
    console.log("Server started");
});