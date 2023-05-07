const mongoose = require('mongoose');
const { Schema } = mongoose;

const productModel = new Schema({
productName:{
    type:String,
    required:true
},
productDescription:{
    type:String,
    required:true,
   },
productCategory:{
    type:String,
    required:true,
},
productSubCategory:{
    type:String
},
productPrice:{
    type:Number,
    required:true,
},
productImages: {
    type: [String],
   required:false,
  }

});
module.exports=mongoose.model('product',productModel);