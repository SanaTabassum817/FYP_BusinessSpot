const userModel=require("../Models/userModel")
const jwt = require("jsonwebtoken")
const userAuthentication = async(req, res, next) => {
    try {
        // console.log("jwt obtained from cookies:",req.cookies.jwt);
        const _id = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY) //verifying the jwt token obtained from cookies and getting user id
        //console.log("user id",_id);
        const user= await userModel.findOne({_id}) //getting user details based on id
        //console.log("user is: ",user);
        if(user){
            req.user = user //attaching userdetails with req Object so that we can use those details in home page
            next()
        }
    } catch (err) {
        const error = "You are not logged in. Please login first."
        //console.log("error: ",error);
        res.send({error:error});
    }
}

const adminAuthentication = async(req, res, next) => {
    try {
        const _id = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY) //verifying the jwt token obtained from cookies and getting user id
        const user= await userModel.findOne({_id}) //getting user details based on id
        // console.log("admin auth");
        if(user){
            if(user.role=="admin"){
                req.user = user //attaching userdetails with req Object so that we can use those details in home page
                next()
            }else{
                const error = "Unauthorized access."
                res.clearCookie("jwt")
                res.redirect(`/login?error=${error}`)
            }  
        }
    } catch (err) {
        const error = "You are not logged in. Please login first."
        res.redirect(`/login?error=${error}`)
    }
}


module.exports.adminAuthentication=adminAuthentication
module.exports.userAuthentication = userAuthentication