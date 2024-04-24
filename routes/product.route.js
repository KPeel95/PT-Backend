const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const {getProducts, getProduct, postProduct, updateProduct,deleteProduct} = require('../controllers/product.controller.js');

// Create a new record in the products collection
router.post('/', postProduct);

// Return all records from the products collection
router.get('/', getProducts);

// Return a single record from the products collection, :id creates a placeholder variable, so change that to whatever id you want to return
router.get('/:id', getProduct);

//Put request to update a record in the products collection
router.put('/:id', updateProduct)

//Delete request to delete a record in the products collection
router.delete('/:id', deleteProduct);

module.exports = router;