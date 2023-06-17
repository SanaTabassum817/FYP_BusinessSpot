const express = require('express');
const orderController = require('../Controllers/orderController');
const router = express.Router();
const middleware=require('../middleware/userAuthentication.js')
// const  uploadImage  =require("../middleware/fileUploadMiddleware.js")



//  ROUTE 5 :post save order
// router.post("/saveOrders",middleware.userAuthentication,orderController.saveOrders);
router.get("/getAllOrders",orderController.getAllOrders);
router.delete("/deleteOrder/:id",orderController.deleteOrder);





module.exports = router;