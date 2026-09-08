const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Expresserror=require("../utils/Expresserror.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const validateReview=(req,res,next)=>{
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        next(new Expresserror(400, errMsg));
        return;
    }
    next();
};
router.post("/", validateReview, wrapAsync(async(req,res)=>{
    console.log(req.params.id);
    let listing=await Listing.findById(req.params.id);
    let newReview =new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}));
//delete  review route we are making here
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});//review array sai review id ko remove karne ke liye $pull use karrray
    //pull operator removes the existing array all the instances of the value that match the specified condition.
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}));
module.exports=router;