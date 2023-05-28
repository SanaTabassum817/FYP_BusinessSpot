const mongoose=require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken")

const categorySchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,   
    },
    subCategories: {
        type: [String],
       required:false,
    }
})



const categoryModel=new mongoose.model("Categorie",categorySchema)

module.exports=categoryModel