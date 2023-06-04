const express = require('express');
const orderController = require('../Controllers/orderController');
const router = express.Router();
const middleware=require('../middleware/userAuthentication.js')
// const  uploadImage  =require("../middleware/fileUploadMiddleware.js")


// ROUTE 2 : get all the products using get request 
router.get("/getOrderDetailsByUser",middleware.userAuthentication,orderController.getOrderByUser);
//  ROUTE 5 :get product by category using 
router.get("/getOrderDetailsById",middleware.userAuthentication,orderController.getOrderById);
//  ROUTE 5 :post save order
router.post("/saveOrders",middleware.userAuthentication,orderController.saveOrders);





module.exports = router;