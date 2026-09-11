module.exports.isloggedIn=(req,res,next)=>{
    console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated())  {
        //redirect url save it 
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be loggged in to create listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)  {
        res.locals.redirectUrl=req.session.redirectUrl || "listings";
    }
    next();
};