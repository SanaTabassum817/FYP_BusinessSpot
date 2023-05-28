const mongoose = require("mongoose")
const Schema = mongoose.Schema
const resetPasswordTokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique:true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now(),
        expires: 3600
    }
})
const resetPassswordTokenModel = new mongoose.model("resetPasswordToken", resetPasswordTokenSchema)
module.exports = resetPassswordTokenModel