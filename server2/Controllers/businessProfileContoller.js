const businessProfile = require('../Models/businessProfileModel');
const user=require('../Models/userModel');

// 1. Get user profile info
const getBusinessInfo = async (req, res) => {
  console.log("Req received at backend");
 
  try {
    let userProfile = await businessProfile.find();

    res.send(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in fetching user profile");
  }
};




module.exports = {
  getBusinessInfo,
  
};
