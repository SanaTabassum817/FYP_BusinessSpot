const express = require('express');
const categoryController = require('../Controllers/categoryController.js');
const router = express.Router();

//1) ROUTE 1 : add new category post request 
router.post("/addNewCategory",categoryController.addNewCategory);
//1) ROUTE 2 : get all the categories using get request 
router.get("/getCategories",categoryController.getCategories);

module.exports = router;