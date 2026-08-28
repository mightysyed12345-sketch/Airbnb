const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const mongourl='mongodb://127.0.0.1:27017/wanderlust';
const path=require('path');
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const Expresserror=require("./utils/Expresserror.js");
const {listingSchema}=require("./schema.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Debug route to test body parsing
app.post("/test", (req,res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    res.json({received: req.body, headers: req.headers});
});

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});
async function main()  {
    await mongoose.connect(mongourl);
}
//index route 

// app.get("/testListing", async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calanguate GOA",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
//index route 
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));
// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.engine('ejs', ejsMate);
// app.use(express.static(path.join(__dirname,"public")));

//new  route 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error)  {
        let errMsg=error.details.map((el)=>{el.message}).join(",");
        throw new Expresserror(400,result.error);
    }else {
        next();
    }
};
//show route 
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//create the route 
app.post("/listings",validateListing,
    wrapAsync(async(req,res,next)=>{
        let result=listingSchema.validate(req.body);
        console.log(result);
        if(result.error)  {
            throw new Expresserror(400,result.error);
        }
        let newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
}));
//edit route 
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
//update route 
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
}));
//delete route 
app.delete("/listings/:id" ,(wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})));
app.use((req,res,next)=>{
    next(new Expresserror(404,"page Not Found"));
});
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong!"}=err;
    res.status(statusCode).render("error.ejs",{message});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});