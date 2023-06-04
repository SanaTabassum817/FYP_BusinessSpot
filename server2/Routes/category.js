const express = require('express');
const categoryController = require('../Controllers/categoryController.js');
const middleware=require('../middleware/userAuthentication.js')
const router = express.Router();



//3) ROUTE 3 : get all the categories using get request 
router.get("/getCategories",middleware.userAuthentication,categoryController.getCategories);

module.exports = router;