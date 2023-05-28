const express = require('express');
const categoryController = require('../Controllers/categoryController.js');
const middleware=require('../middleware/userAuthentication.js')
const router = express.Router();

//1) ROUTE 1 : add new category post request 
router.post("/addNewCategory",middleware.userAuthentication,categoryController.addNewCategory);
//2) ROUTE 2 : add new category post request 
router.put("/categories/:category/addNewSubCategory",middleware.userAuthentication,categoryController.addNewSubCategory);
//3) ROUTE 3 : get all the categories using get request 
router.get("/getCategories",middleware.userAuthentication,categoryController.getCategories);

module.exports = router;