const mongoose = require("mongoose");
const validator = require("validator");

const userProfileModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
   profession: {
      type: String,
    },
    about: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Not a valid email.",
      },
    },
   address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileModel);
