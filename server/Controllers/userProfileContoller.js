const UserProfile = require('../Models/userProfileModel');

// 1. Get user profile info
const getUserInfo = async (req, res) => {
  const userId = req.user;

  try {
    const userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).send("User Profile Not Found");
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in fetching user profile");
  }
};

const updateUserInfo = async (req, res) => {
  const {
    businessName,
    businessTagline,
    businessDescription,
    businessEmail,
    businessAddress,
    bContactNumber,
    youtube,
    linkedIn,
    twitter,
    instagram,
    facebook
  } = req.body;

  const userId = req.user;

  try {
    let userProfile = await UserProfile.findOne({ user: userId });

    if (!userProfile) {
      // Call the addUserProfile function to create a new user profile
      userProfile = await addUserProfile(req);
    }

    userProfile.businessName = businessName || userProfile.businessName;
    userProfile.businessTagline = businessTagline || userProfile.businessTagline;
    userProfile.businessDescription = businessDescription || userProfile.businessDescription;
    userProfile.businessEmail = businessEmail || userProfile.businessEmail;
    userProfile.businessAddress = businessAddress || userProfile.businessAddress;
    userProfile.bContactNumber = bContactNumber || userProfile.bContactNumber;
    userProfile.youtube = youtube || userProfile.youtube;
    userProfile.linkedIn = linkedIn || userProfile.linkedIn;
    userProfile.twitter = twitter || userProfile.twitter;
    userProfile.instagram = instagram || userProfile.instagram;
    userProfile.facebook = facebook || userProfile.facebook;

    // Check if file is uploaded
    if (req.file) {
      // Save the file path or perform further processing as needed
      userProfile.logoImage = req.file.path;
    }

    userProfile = await userProfile.save();
    if (result) {
  res.send({ msg: "User profile added successfully." });
} else {
  res.status(500).send({ error: "User profile could not be saved due to some error." });
}

    res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};


// 3. Add user profile
const addUserProfile = async (req, res) => {
  try {
    const {
      businessName,
      businessTagline,
      businessDescription,
      businessEmail,
      businessAddress,
      bContactNumber,
      youtube,
      linkedIn,
      twitter,
      instagram,
      facebook,
      logoImage
    } = req.body;

    const user = req.user;

    const userProfile = new UserProfile({
      user,
      businessName,
      businessTagline,
      businessDescription,
      businessEmail,
      businessAddress,
      bContactNumber,
      youtube,
      linkedIn,
      twitter,
      instagram,
      facebook,
      logoImage
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
  getUserInfo,
  updateUserInfo,
  addUserProfile
};
