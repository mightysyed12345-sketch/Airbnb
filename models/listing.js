const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        filename:  {
            type:String
        },
        url:  {
            type: String,
            default: "https://unsplash.com",
            set: (v) => v === "" ? "https://unsplash.com" : v
        }
    },
    price:Number,
    country: String,
    location:String
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
