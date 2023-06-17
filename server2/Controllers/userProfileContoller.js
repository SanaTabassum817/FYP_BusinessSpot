const UserProfile = require('../Models/userProfileModel');


// 1. Get user profile info
const getUser = async (req, res) => {
  console.log("Req received at backend");
  const userId = req.user._id;
  try {
    let userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      // Call the addUserProfile function to create a new user profile
      return addUser(req, res); // Pass the response object to the addUserProfile function
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

    // Only update the email field if it is provided
    if (email) {
      userProfile.email = email;
    }

    userProfile.address = address || userProfile.address;
    userProfile.contactNumber = contactNumber || userProfile.contactNumber;
    userProfile.image = image || userProfile.image;

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
    
    let userProfile = await UserProfile.findOne({ email });

    if (userProfile) {
      // User profile with the same email already exists
      return res.status(400).send({ error: "User profile with this email already exists." });
    }
    
    userProfile = new UserProfile({
      user,
      name,
      profession,
      about,
      email,
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
