const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isloggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");

router.get("/",wrapAsync(listingController.index));
//new routes 
router.get("/new",isloggedIn,listingController.renderNewForm);
router.get("/:id",wrapAsync(listingController.showListing));
router.post("/",validateListing,wrapAsync(listingController.createlisting));
//edit route 
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.renderEditForm));
const methodOverride=require("method-override");
router.use(methodOverride("_method"));
//edit  route 
router.put("/:id",isloggedIn,isOwner,validateListing,wrapAsync(listingController.updatelisting));
//delete route 
router.delete("/:id" ,isloggedIn,isOwner,(wrapAsync(listingController.deletelisting)));
module.exports=router;