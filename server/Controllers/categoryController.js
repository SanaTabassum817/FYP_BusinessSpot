const categoryModel=require("../Models/categoryModel")

//Controller 1:
const addNewCategory=async (req,res)=>{
    try{
        let {category}=req.body
        console.log(category);
        category=category.toLowerCase();
        const result1=await categoryModel.findOne({category})
        if(result1){
            res.send({error:"Another category already exists under the same name."})
        }else{
            const c1=new categoryModel({
                category
            })
            const result2=await c1.save()
            if(result2._id){
                res.send(result2)
            }else{
                res.send({error:"Some error has occured while adding the category."})   
            }
        }
    }catch(error){
        console.log(error);;
        res.send({error:"Some error has occured while adding the new category."})
    }
}

//Controller 2:
const getCategories=async (req,res)=>{
    const result1=await categoryModel.find({})
    res.status(200).send(result1);

}
module.exports.addNewCategory=addNewCategory;
module.exports.getCategories=getCategories;