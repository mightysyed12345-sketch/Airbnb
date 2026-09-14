const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isloggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isloggedIn,
    validateListing,
    wrapAsync(listingController.createlisting)
);
//new route 
router.get("/new",isloggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isloggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updatelisting)
)
.delete(isloggedIn,isOwner,wrapAsync(listingController.deletelisting));
//edit route 
router.get(
    "/:id/edit",
    isloggedIn,
    wrapAsync(listingController.renderEditForm)
);
module.exports=router;