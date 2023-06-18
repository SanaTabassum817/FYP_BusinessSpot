const express = require("express");
const orderController = require("../Controllers/orderController");
const router = express.Router();
const middleware = require("../middleware/userAuthentication.js");

//  ROUTE 5 :post save order TODO middleware
router.get("/getAllOrders", orderController.getAllOrders);
// delete a order
router.delete("/deleteOrder/:id",  orderController.deleteOrder);

module.exports = router;
