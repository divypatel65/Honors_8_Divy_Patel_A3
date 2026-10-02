const express = require("express");
const session = require("express-session");
const filestore = require("session-file-store")(session);

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:"mysecret",
    resave:false,
    saveUninitialized:false,
    store:new filestore()
}));

app.get("/",function(req,res){
    res.send(`
        <h2>Login</h2>
        <form action="/login" method="post">

        Username: <input type="text" name="username" required>
        <br><br>

         Password: <input type="password" name="password" required>
        <br><br>

         <button type="submit">Login</button>
         </form>
        `);
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(username === "admin" && password ==="1234")
    {
        req.session.username = username;

        res.redirect("/home");
    }else{
        res.send("Invalid Username or Password");
    }
});

function checklogin(req,res,next){
    if(req.session.username)
    {
        next();
    }
    else{
        res.redirect("/");
    }
}

app.get("/home",checklogin,function(req,res){
    res.send(`
        <h2>Home Page </h2>

        <p>Welcome ${req.session.username} </p>

        <a href="/profile">Profile</a>
        <br><br>

        <a href="/logout">Logout</a>

        `);
});

app.get("/profile",checklogin,function(req,res){
    res.send(`
        <h2>Profile Page </h2>

        <p>Username: ${req.session.username} </p>

        <a href="/home">Home</a>
        <br><br>

        <a href="/logout">Logout</a>

        `);
});

app.get("/logout",function(req,res){
    req.session.destroy(function(){
        res.redirect("/");
    });
});

app.listen(3000,function(){
    console.log("server running on http://localhost:3000");
});