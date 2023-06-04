const express = require('express');
const productController = require('../Controllers/productController.js');
const router = express.Router();
const middleware=require('../middleware/userAuthentication.js')
const  uploadImage  =require("../middleware/fileUploadMiddleware.js")


// ROUTE 2 : get all the products using get request 
router.get("/getProducts",middleware.userAuthentication,productController.getAllProducts);
//  ROUTE 5 :get product by category using 
router.get("/getProductsByCategory/:productCategory",middleware.userAuthentication,productController.getProductsByCategory);





module.exports = router;