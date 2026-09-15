const express=require("express");
const app=express();
const users=require("./routers/useri.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret:"mysuperstarsccret",
    resave:false,
    saveUninitialized:false,
};
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.errorMsg=req.flash("error");
    res.locals.succmsg=req.flash("success");
})
app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous") {
        req.flash("error","user not registered");
    }else {
        req.flash("success","user registered successfully");
    }
    req.flash("success","user register successfully");
    req.session.save(()=>{
        res.redirect("/hello");
    })
});
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});