const categoryModel=require("../Models/categoryModel")


//Controller 2:
const getCategories=async (req,res)=>{
    const result1=await categoryModel.find({})
    res.status(200).send(result1);

}




module.exports.getCategories=getCategories;
