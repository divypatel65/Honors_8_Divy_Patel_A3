const express=require("express");
const path=require("path");
const multer=require("multer");

const{ body,validationResult}=require("express-validator");
const app=express();

//ejs setup
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true})); //compulsary for reading data

//make folder accssible
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

//multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,"uploads/");
},filename:function(req,file,cb){
    const filename = file.originalname;
    cb(null,filename);
}
});

const upload = multer(
    {
    storage:storage,
    limits:{fileSize: 2*1024*1024},
    fileFilter:function(req,file,cb){
        const allowed = /jpg|jpeg|png|gif/;
        const extension=allowed.test(path.extname(file.originalname).toLowerCase());
        const mimetype=allowed.test(file.mimetype);
        if(extension && mimetype){
            cb(null,true);
        }else{
            cb(new Error("Only JPG,jpeg,png and gif files are allowed"));
        }
    }});

//home page
//errors: [] ensures that there is an empty array ready if frontend error messages need to be displayed later.
//old: {} ensures there is an empty object ready to hold previous form inputs if validation fails later and fields need to be repopulated.
app.get("/",function(req,res){
    res.render("form",{
        errors:[],
        old:{}
    });
});
//registration
app.post("/register",upload.fields(
    [
    {
        name:"profilepic",
        maxCount:1
    },
    {
        name:"otherpics",
        maxCount:5
    }
    ]),
//validation
[
    body("username").trim().notEmpty().withMessage("Username required")
    .isLength({min:3}).withMessage("Username must be at least 3 characters"),
    body("password").notEmpty().withMessage("Password is required")
    .isLength({min:6}).withMessage("Password must be at least 6 characters"),
    body("confirmpassword").notEmpty().withMessage("Confirm password is required")
    .custom(
        (value,{req}) =>{
            if(value!==req.body.password){
                throw new Error("Passwords do not match");
            }
            return true;
        }
        
    ),
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    body("gender").notEmpty().withMessage("Please select gender"),
    body("hobbies")
    .custom((value)=>{
        if(!value){
             throw new Error("Select At Least one hobby");
        }
        return true;
    })
],
//request handler
function (req,res) {
    const errors = validationResult(req);
    if(!req.files || !req.files.profilepic)
    {
        errors.errors.push({
            msg:"Profile picture is required"
        });
    }
    //other picture validation
    if(!req.files || !req.files.otherpics)
    {
        errors.errors.push({
            msg:"Please upload at least one other picture"
        });
    }
    if(!errors.isEmpty())
    {
        return res.render("form",{
            errors:errors.array(),
            old:req.body
        });
    }
    res.render("result",{
        data:req.body,
        files:req.files
    });
}
);

//download file
app.get("/download/:filename",function(req,res){
    const filepath=path.join(__dirname,"uploads",req.params.filename);
    res.download(filepath,function(error){
        if(error){
            console.log("Download error:",error.message);
        }
    });
});

//Error handler
app.use(function(err,req,res,next){
    console.log(err.message);
    res.render("form",{
        errors:[
            {
                msg:err.message
            }
        ],
        old:req.body || {}
    });
});

//start server
app.listen(3000,function(){
    console.log("Server started at http://localhost:3000");
});