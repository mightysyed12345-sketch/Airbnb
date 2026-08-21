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
    image:  {
        filename:  {
            type:String
        },
        url:  {
            type:String,
            default:"https://i.pinimg.com/736x/74/e8/a8/74e8a8e8d03c569c59428160ad26ccee.jpg",
            set :(v)=> v===""?"https://i.pinimg.com/736x/74/e8/a8/74e8a8e8d03c569c59428160ad26ccee.jpg":v
        }
    },
    price:Number,
    country:String,
    location:String
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
