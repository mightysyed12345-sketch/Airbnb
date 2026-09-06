const express=require("express");
const router=express.Router();

router.get("/users",(req,res)=>{
    res.send("get the router for users");
});
router.get("/users/:id",(req,res)=>{
    res.send("get the router for users with id");
});
router.post("/users",(req,res)=>{
    res.send("post the router for users");
});
router.put("/users/:id",(req,res)=>{
    res.send("put the router for users with id");
});
router.delete("/users/:id",(req,res)=>{
    res.send("delete the router for users with id");
});
module.exports=router;