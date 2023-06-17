const mongoose = require("mongoose");
const validator = require("validator");

const businessProfileModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    businessName: {
      type: String,
    },
    businessTagline: {
      type: String,
    },
    businessDescription: {
      type: String,
    },
    businessEmail: {
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
    businessAddress: {
      type: String,
    },
    bContactNumber: {
      type: String,
    },
    youtube: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    logoImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusinessProfile", businessProfileModel);
