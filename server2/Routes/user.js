const express = require('express');
const userController = require('../Controllers/userController.js');
const router = express.Router();
const middleware=require('../middleware/userAuthentication.js')
const userProfileController=require('../Controllers/userProfileContoller.js')
const businessProfileController=require('../Controllers/businessProfileContoller.js')
const  uploadImage  =require("../middleware/fileUploadMiddleware.js")

//1) ROUTE 1 : signup post request 
router.post("/signup",userController.signupUser)
//2) ROUTE 2 : login post request
router.post("/login",userController.loginUser)
//3) ROUTE 3 : email verification get request
router.get("/users/:userId/verify/:verificationToken",userController.verifyUser)
//4) ROUTE 4 : send password reset email
router.post("/forgetPassword",userController.resetPassword)
//5) ROUTE 5 : password reset get request 
router.post("/users/:userId/changePassword/:resetPassswordToken",userController.changePassword)
//6) ROUTE 6: Admin authentication on home
router.get("/",middleware.userAuthentication,userController.home)

// routes for userBusinessProfile

router.get("/getUser",middleware.userAuthentication,userProfileController.getUser)
//8) ROUTE 8: update UserProfile Info
router.put("/updateUser",middleware.userAuthentication,uploadImage.single('image'),userProfileController.updateUser)
//9) ROUTE 8: update UserProfile Info
router.post("/addUser",middleware.userAuthentication,userProfileController.addUser)
// get business profile data
router.get("/getBusinessInfo",middleware.userAuthentication,businessProfileController.getBusinessInfo)



module.exports = router;