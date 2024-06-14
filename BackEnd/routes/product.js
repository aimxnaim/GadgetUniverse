const express = require('express');
const router = express.Router();
const {
    getProducts,
    newProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    createProductReview
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products')
    .get(getProducts);

router.route('/admin/products')
    .post(
        isAuthenticatedUser,
        authorizeRoles('admin'),
        newProduct
    );

router.route('/products/:id')
    .get(getProductDetails)

router.route('/admin/products/:id')
    .put(
        isAuthenticatedUser,
        authorizeRoles('admin'),
        updateProduct
    )
    .delete(
        isAuthenticatedUser,
        authorizeRoles('admin'),
        deleteProduct
    );

router.route('/reviews')
    .put(createProductReview);

module.exports = router;