const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveredirectUrl:saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");


router.get("/signup",wrapAsync(userController.rendersignup));
router.post("/signup",wrapAsync(userController.rendersignup));
router.get("/login",userController.renderlogin);
router.post("/login",saveRedirectUrl,passport.authenticate("local",
{failureRedirect:'/login',failureFlash:true}),userController.login);

router.get("/logout",userController.logout);
module.exports=router;
