const userModel=require("../Models/userModel")
const tokenModel=require("../Models/tokenModel")
const resetPassswordTokenModel=require("../Models/resetPasswordTokenModel")
const bcryptjs=require("bcryptjs")
const crypto = require("crypto")
const sendEmailtoUser =require("../utils/sendEmailToUser")

//Controller: 1
const signupUser=async (req,res)=>{
    const {name,email,role,password,cPassword}=req.body
    
    if(password!=cPassword){
        res.send({error:"Passwords does not match"})
    }else{
       const result1=await userModel.findOne({email})
       if(result1){
            res.send({error:"There is another account with this email."})
       }else{
            const user=new userModel({
                name,
                role,
                email,
                password
            })
            const result2=await user.save()
            const token = new tokenModel({
                userId: result2._id,
                token: crypto.randomBytes(32).toString("hex")
            })
            const result3=await token.save()
           
            const url = `${process.env.BASE_URL}users/${result2._id}/verify/${result3.token}`
            console.log(url);
            //res.cookie("signup","zain")
            // send verification email to user 
            const subject="Verify your Account"
            const text="Click on below button to verify your Account"
            try
            {
                sendEmailtoUser(url, email,subject,text);
                res.send({msg:"Signup Successful. A verification email is sent to you. Please verify your email to proceed."})
            }catch(error){
                return res.send({ error: "Error occured while sending email" });
            }
       }
    }
}

//Controller: 2
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    const result=await userModel.findOne({email})
    if(!result){
        res.send({error:"Email not found."})
    // if email founds
    }else{
        // if account is verified
        if(result.verified){
            const hashPassword=result.password
            const isMatched=await bcryptjs.compare(password,hashPassword)
            // if password is correct
            if(isMatched){
                const authToken=await result.generateAutheticationToken()
                res.cookie("jwt",authToken,
                {
                    expires:new Date(Date.now()+30000000), //expires token after 5 min
                    
                })
                
                //sending user information as a response
                res.send(result)  
            }else{
                res.send({error:"Incorrect Password"})
            }
        }else{
            // if account is not verified
            const token1 = await tokenModel.findOne({ userId: result._id })
            if (token1) {
                res.send({error:"Please verify your email first."})
              
            }else{
                const token2 = new tokenModel({
                    userId: result._id,
                    token: crypto.randomBytes(32).toString("hex")
                })
                const result2=await token2.save()
                const url = `${process.env.BASE_URL}users/${result._id}/verify/${result2.token}`
                res.send({msg:"A verification link is sent to your email. Please verify it first.",url})
            }
        }
    }
}
//Controller 3:
const verifyUser=async(req,res)=>{
    const userId= req.params.userId
    const token=req.params.verificationToken
    const user=await userModel.findOne({_id:userId})
    //if user exists in db
    if(user){
        //checking whether user is verified or not

        // if user is not verified
        if(user.verified==false){
            // deleting verification token from token model
            const result= await tokenModel.findOneAndDelete({
                userId,
                token
            })
            // if deletion successfull then updating the verification status of user to true
            if(result){
                const result2=await userModel.updateOne({_id:userId},{verified:true})
                if(result2){
                    res.send({msg:"Email verified successfully."})
                    
                }else{
                    res.send({error:"Error occurend while email verification"})
                }
            //if error occurs while deleting token it means the url is invalid
            }else{
                res.send({error:"URL has expired."})
            }
        }else{
            res.send({msg:"Already verified."})
        }
    }else{
        res.send({error:"Verification URL has expired."})
    }      
}

//Controller: 4
const resetPassword=async(req,res)=>{
    const {email}=req.body
    const user=await userModel.findOne({email})
    if (user){
        try
        {
            //if user founds then creating a new token
            //crecking if the reset password already exists or not
            const result=await resetPassswordTokenModel.findOneAndDelete({
                userId:user._id
            })
            console.log("prev token is: ",result);
            const token = new resetPassswordTokenModel({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            })
            const result2=await token.save()
            const url = `${process.env.BASE_URL}users/${user._id}/changePassword/${result2.token}`
            console.log(url);
            // send forget password email to user 
            const subject="Reset your Business Spot account password "
            const text="Click on below button to reset your password"
            sendEmailtoUser(url, email,subject,text);
            res.send({msg:"We have sent an email to reset your password. Check it out to proceed."})
        }catch(error){
                return res.send({ error: "Error occured while sending password reset email" });
            }
    }else{
        res.send({error:"Email not found."})
    }
}

//Controller 5:
const changePassword=async(req,res)=>{
    const userId= req.params.userId
    const token=req.params.resetPassswordToken
    const {password,cPassword}=req.body
    const user=await userModel.findOne({_id:userId})
    //if user exists in db
    if(user){
        const result= await resetPassswordTokenModel.findOneAndDelete({
                userId,
                token
            })
        // if deletion successfull then updating the password of user
        if(result){
            const result2=await userModel.updateOne({_id:userId},{password:password})
            if(result2){
                res.send({msg:"Password updated successfully."})
            }else{
                res.send({error:"Error occured while changing password."})
            }
        //if error occurs while deleting token it means the url is invalid
        }else{
            res.send({error:"URL has expired."})
        }
    }else{
        res.send({error:"Invalid user."})
    }     
}

//Controller 6:
const home=async(req,res)=>{
    if(req.user){
        console.log("User is authorized to access this page");
        console.log(req.user);
        res.send(req.user);
    } 
}


module.exports.signupUser=signupUser
module.exports.loginUser=loginUser
module.exports.verifyUser=verifyUser
module.exports.resetPassword=resetPassword
module.exports.changePassword=changePassword
module.exports.home=home