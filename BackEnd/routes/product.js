const express = require('express');
const router = express.Router();
const {
    getProducts,
    newProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview,
    canUserReview,
    getAdminProducts,
    uploadProductImages,
    deleteProductImage
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products')
    .get(getProducts);

router.route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
    .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/products/:id')
    .get(getProductDetails)

router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/admin/products/:id/upload_images')
    .put(isAuthenticatedUser, authorizeRoles('admin'), uploadProductImages);

router.route('/admin/products/:id/delete_image')
    .put(isAuthenticatedUser, authorizeRoles('admin'), deleteProductImage);

router.route('/reviews')
    .get(isAuthenticatedUser, getProductReviews)
    .put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductReview);

router.route('/can_review')
    .get(isAuthenticatedUser, canUserReview);

module.exports = router;