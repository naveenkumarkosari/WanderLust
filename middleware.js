const Listing=require( "./models/listing");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js")

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create a listing!");
        return res.redirect("/login");
    
      }
      next();
};

module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next(); 
}


module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing= await Listing.findById(id);
    if(listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("You dont have Permission to update");
      return res.redirect(`/listings/${id}`)
    }
    next();

}

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressErrror(400, errMsg);
    } else {
      next();
    }
  };

  module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressErrror(400, errMsg);
    } else {
      next();
    }
};