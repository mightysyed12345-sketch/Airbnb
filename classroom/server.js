const express=require("express");
const app=express();
const users=require("./routers/useri.js");
const cookieParser=require("cookie-parser");

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views","./views");
app.use(cookieParser("secretcode"));

app.get("/getcookiessigned",(req,res)=>{
    res.cookie("made-in","india",{signed:true});
    res.send("sent you a signed cookie");
});
app.get("/getcookies",(req,res)=>{
    res.cookie("great","syedmohammed");
    res.cookie("alexander","the great");
    res.send("sent you some cookies");
});
app.get("/greet",(req,res)=>{
    let{name="anonymouse"}=req.cookies;
    res.send(`hey there ${name}`);
});
app.get("/users",(req,res)=>{
    console.log(req.cookies);
    res.send("get the router for users");
});
app.use("/users",users);
app.get("/users/:id",(req,res)=>{
    res.send("get the router for users with id");
});
app.get("/verify",(req,res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send("verified cookies");
});
app.post("/users",(req,res)=>{
    res.send("post the router for users");
});
app.put("/users/:id",(req,res)=>{
    res.send("put the router for users with id");
});
app.delete("/users/:id",(req,res)=>{
    res.send("delete the router for users with id");
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});