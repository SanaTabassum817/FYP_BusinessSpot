const express = require('express');
const productController = require('../Controllers/productController.js');
const router = express.Router();
const middleware=require('../middleware/userAuthentication.js')
const  uploadImage  =require("../middleware/fileUploadMiddleware.js")

// ROUTE 1 : add new product post request 
router.post("/addNewProduct",middleware.userAuthentication,uploadImage.array('productImages',10),productController.addNewProduct);
// ROUTE 2 : get all the products using get request 
router.get("/getProducts",middleware.userAuthentication,productController.getAllProducts);
// ROUTE 3 : delete product using delete
router.delete("/deleteProduct/:id",middleware.userAuthentication,productController.deleteProduct);
//  ROUTE 4 :update product using put
router.put("/updateProduct/:id",middleware.userAuthentication,productController.updateProduct);
//  ROUTE 5 :get product by category using 
router.get("/getProductsByCategory/:productCategory",middleware.userAuthentication,productController.getProductsByCategory);
// get by id
// router.get("/getProductByID/:id",middleware.userAuthentication,productController.getProductByID);

router.get("/getProductByID/:id",productController.getProductByID);



module.exports = router;