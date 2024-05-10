const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type:String,
    default:"https://unsplash.com/photos/TiVPTYCG_3E", 
    set: (v) => (v === "" ? "https://unsplash.com/photos/TiVPTYCG_3E" : v),
  },
  price:Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports= Listing;
