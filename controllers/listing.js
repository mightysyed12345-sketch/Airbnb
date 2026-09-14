// we are doing this because of the mvc framework model views controller framework
const Listing=require("../models/listing");
module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).
    populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing)  {
        req.flash("error","Listing you are requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};
module.exports.createlisting=async(req,res,next)=>{
        if (req.file) {
            req.body.listing.image = {
                filename: req.file.filename,
                url: req.file.path
            };
        }
        const newListing=new Listing(req.body.listing);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
};
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing)  {
        req.flash("error","Listing you are Requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};
module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    const listingData={...(req.body?.listing || {})};
    if (req.file) {
        listingData.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    }
    await Listing.findByIdAndUpdate(id,listingData);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.deletelisting=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};