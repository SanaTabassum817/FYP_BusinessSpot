const productModel = require("../Models/productModel");
const mongoose = require("mongoose");
const { upload } = require("../middleware/fileUploadMiddleware.js");

//1.  Controller  to getallProducts by category
const getProductsByCategory = async (req, res) => {
  const productCategory = req.params.productCategory;
  try {
    const products = await productModel.find({ productCategory });
    // console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: `Error in fetching products of ${productCategory}` });
  }
};

// 2 to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    // console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Error in fetching all products" });
  }
};

module.exports.getAllProducts = getAllProducts;

module.exports.getProductsByCategory = getProductsByCategory;
