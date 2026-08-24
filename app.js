const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const mongourl='mongodb://127.0.0.1:27017/wanderlust';
const path=require('path');
const ejsMate=require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));

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
app.get("/listings", async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.engine('ejs', ejsMate);
// app.use(express.static(path.join(__dirname,"public")));

//new  route 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
app.get("/listings/new",(req,res)=>{
    res.send("Hi iam root");
});
//show route 
app.use(express.urlencoded({extended:true}));
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});
//create the route 
app.post("/listings",async(req,res)=>{
    const NewListing=new Listing(req.body.listing);
    await NewListing.save();
    res.redirect("/listings");
});
//edit route 
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
//update route 
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});
//delete route 
app.delete("/listings/:id" ,async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
app.post("/listings", async (req, res) => {
    const { title, description, price, location, country, image } = req.body;
    
    // Construct the object manually to match your data.js / database structure
    const newListing = new Listing({
        title,
        description,
        price,
        location,
        country,
        image: {
            filename: "listingimage",
            url: image // Wraps the flat string url into the expected object structure
        }
    });
    
    await newListing.save();
    res.redirect("/listings");
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});