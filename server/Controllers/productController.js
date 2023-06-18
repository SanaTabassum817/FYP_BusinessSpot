const productModel = require('../Models/productModel');
const mongoose = require("mongoose")
const { upload } =require("../middleware/fileUploadMiddleware.js")
//1.  Controller  to getallProducts by category
const getProductsByCategory = async (req, res) => {
    const productCategory = req.params.productCategory;
    try {
      const products = await productModel.find({ productCategory });
      // console.log(products);
      res.json(products);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({error:`Error in fetching products of ${productCategory}`});
    }
  };
  const getProductByID = async (req, res) => {
    const { id } = req.params;
    try {
      const products = await productModel.findOne({ productID: id });
      res.json(products);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: `Error in fetching products of ${id}` });
    }
  };
  
  
// 2 to get all products
const getAllProducts=async(req,res)=>{
    try {
        const products = await productModel.find({});   
        // console.log(products);
        res.json(products);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Error in fetching all products"});
    }
}

// 2. Controller to add product

const addNewProduct=async(req,res)=>{
    try {
      const productImages = req.files.map((file) => file.location);
      // console.log(productImages);
      // const productImages  = req.files.map(file => file.location);
      const { productName, productDescription, productCategory, productSubCategory, productPrice } = req.body;
      // console.log(productImages);
      const product = new productModel({
        productName,productDescription,productCategory,productSubCategory,productPrice,productImages
      })
      const result = await product.save();
      // console.log("Result is:");
      // console.log(result);
      if(result){
        res.status(200).send(result)
      }else{
        res.status(500).send({error:"Product could not be saved due to some error."})
      }   
    }
    catch (error) {
        console.error(error);
        res.status(500).send({error:"Product could not be saved due to some error."})
    }
}

// 3. Controller to update product

const updateProduct = async (req, res) => {
    const { productName, productDescription, productCategory, productPrice, productImages } = req.body;
  
    try {
      // Create a product object
      const newProduct = {};
      if (productName) { newProduct.productName = productName };
      if (productDescription) { newProduct.productDescription = productDescription };
      if (productPrice) { newProduct.productPrice = productPrice };
      if (productCategory) { newProduct.productCategory = productCategory };
      if (productImages) { newProduct.productImages = productImages };
  
      //Find the product to be updated and update it
      // console.log(req.params.id);
      let product = await productModel.findById(req.params.id);
      if (!product) { return res.status(404).send("Not Found"); }
    //   if (product.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed");
    //   }
  
      // Update the product and send the updated product in response
      product = await productModel.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
      res.json({ product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
  

// 4. Controller to delete note

const deleteProduct = async (req, res) => {
    try {
      // Check if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid product ID');
      }
  
      // Find the product to be deleted
      let product = await productModel.findById(req.params.id);
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Allow deletion if user owns this product
    //   if (product.user.toString() !== req.user.id) {
    //     return res.status(401).send('Not allowed');
    //   }
  
      // Delete the product
      product = await productModel.findByIdAndDelete(req.params.id);
      res.json({ 'Success': 'Product has been deleted', product: product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Product could not be deleted');
    }
  };
  
module.exports.addNewProduct=addNewProduct;
module.exports.getAllProducts=getAllProducts;
module.exports.deleteProduct=deleteProduct;
module.exports.updateProduct=updateProduct;
module.exports.getProductsByCategory=getProductsByCategory;
module.exports.getProductByID=getProductByID;
