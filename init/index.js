require("dotenv").config();
const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const mongourl='mongodb://127.0.0.1:27017/wanderlust';

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main()  {
    await mongoose.connect(mongourl);
}
// Look for your router.post("/listings", ...) route

const initDB=async () =>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"6aa42a67bde060d7cf7dfbaf"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialised ");
}
initDB();