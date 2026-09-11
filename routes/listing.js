const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Expresserror=require("../utils/Expresserror.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isloggedIn}=require("../middleware.js");
const validateListing=(req,res,next)=>{
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        next(new Expresserror(400, errMsg));
        return;
    }
    next();
};

router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));
//new routes 
router.get("/new",isloggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing)  {
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}));
router.post("/",validateListing,
    wrapAsync(async(req,res,next)=>{
        const newListing=new Listing(req.body.listing);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
}));
//edit route 
router.get("/:id/edit",isloggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing)  {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
    })
);
const methodOverride=require("method-override");
router.use(methodOverride("_method"));
//edit  route 
router.put("/:id",validateListing,isloggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect("/listings");
}));
//delete route 
router.delete("/:id" ,isloggedIn,(wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
})));
module.exports=router;