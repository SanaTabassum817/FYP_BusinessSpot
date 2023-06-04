const UserProfile = require('../Models/userProfileModel');
const user=require('../Models/userModel');

// 1. Get user profile info
const getUser = async (req, res) => {
  console.log("Req received at backend");
  const userId = req.user._id;
  try {
    let userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      // Call the addUserProfile function to create a new user profile
      return addUserProfile(req, res); // Pass the response object to the addUserProfile function
    }

    res.send(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in fetching user profile");
  }
};


const updateUser = async (req, res) => {
  const {
    name,
    profession,
    about,
    email,
    address,
    contactNumber,
    image,
  } = req.body;
  

  const userId = req.user._id;

  try {
    let userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).send("User Profile Not Found");
    }

    userProfile.name = name || userProfile.name;
    userProfile.profession = profession || userProfile.profession;
    userProfile.about = about || userProfile.about;
    userProfile.email = email || userProfile.email;
    userProfile.address = address || userProfile.address;
    userProfile.contactNumber = contactNumber || userProfile.contactNumber;
    userProfile.image = image || userProfile.image;
    
 // Validate the image field
 if (Array.isArray(image)) {
  userProfile.image = null;
} else {
  userProfile.image = image;
}
    // Check if file is uploaded
    if (req.file) {
      // Save the file path or perform further processing as needed
      userProfile.image = req.file.path;
    }

    userProfile = await userProfile.save();

    res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};


// 3. Add user profile
const addUser = async (req, res) => {
  try {
    const {
      name,
      profession,
      about,
      email,
      address,
      contactNumber,
      image,
    } = req.body;
    
    const user = req.user;
    
    const userProfile = new UserProfile({
      user,
      name,
      profession,
      about,
      email: user.email, // Use email from User model
      address,
      contactNumber,
      image,
    });
    

    const result = await userProfile.save();

    if (result) {
      res.send({ msg: "User profile added successfully." });
    } else {
      res.status(500).send({ error: "User profile could not be saved due to some error." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "User profile could not be saved due to some error." });
  }
};

module.exports = {
  getUser,
  updateUser,
  addUser
};
