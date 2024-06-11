const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/products')
    .get(getProducts);

router.route('/admin/products')
    .post(newProduct);

router.route('/products/:id')
    .get(getProductDetails)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;