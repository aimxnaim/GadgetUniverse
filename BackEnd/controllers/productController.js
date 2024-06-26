const { default: mongoose } = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const APIFilters = require('../utils/apiFilters');
const { uploadfile, removefile } = require('../utils/cloudinary');

// Get all products => /api/v1/products
module.exports.getProducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query)
        .search()
        .filter();

    //// console.log(`req.user : ${req.user}`)

    let products = await apiFilters.query;
    let filterProductCount = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();

    res.status(200).json({
        resPerPage,
        filterProductCount,
        products
    });
});

// Create new product => /api/v1/admin/products
module.exports.newProduct = catchAsyncErrors(async (req, res) => {
    // associate the user with the product
    req.body.user = req.user._id;

    const product = await Product.create(req.body);
    res.status(200).json({
        product
    });
});


// Get single product details => /api/v1/products/:id
module.exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
        .populate('reviews.user');

    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    }
    res.status(200).json({
        product
    });
});

// Get products - ADMIN => /api/v1/admin/products
module.exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        products
    });
});

// Update product details => /api/v1/products/:id
module.exports.updateProduct = catchAsyncErrors(async (req, res) => {

    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    }

    product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        product
    });
});

// Update product images => /api/v1/admin/products/:id/upload_images
module.exports.uploadProductImages = catchAsyncErrors(async (req, res) => {

    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    }

    const uploader = async (images) => uploadfile(images, `GadgetUniverse/products`);

    const urls = await Promise.all(req?.body?.images.map(uploader));
    product?.images?.push(...urls);

    await product.save();

    res.status(200).json({
        product
    });
});

// Delete product images => /api/v1/admin/products/:id/delete_images
module.exports.deleteProductImage = catchAsyncErrors(async (req, res) => {

    const { id } = req?.params;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    }

    const isDeleted = await removefile(req.body.imgId);

    if (isDeleted) {
        product.images = product?.images?.filter(
            img => img.public_id !== req.body.imgId
        );

        await product?.save();
    }

    res.status(200).json({
        product
    });
});

// Delete product => /api/v1/products/:id
module.exports.deleteProduct = catchAsyncErrors(async (req, res) => {

    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    }

    // Delete product images associated with the product
    for (let i = 0; i < product?.images?.length; i++) {
        await removefile(product?.images[i].public_id);
    }

    product = await Product.deleteOne({ _id: id });
    res.status(200).json({
        message: 'Product deleted successfully'
    });
});

// Create/Update product review => /api/v1/reviews
module.exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    };

    const isReviewed = product?.reviews?.find(
        r => r?.user?.toString() === req?.user?._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review?.user?.toString() === req?.user?._id.toString()) {

                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get product review => /api/v1/reviews
module.exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.id).populate('reviews.user');

    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    };

    res.status(200).json({
        reviews: product.reviews
    });
});

// Delete product review => /api/v1/admin/reviews
module.exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    };

    // Filter out the reviews that are not equal to the review id
    product.reviews = product?.reviews?.filter(
        review => review._id.toString() !== req?.query?.id.toString()
    );

    product.numOfReviews = product.reviews.length;

    product.ratings =
        product.numOfReviews === 0
            ? 0
            : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.numOfReviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        product
    });
});

// Can user review => /api/v1/can_review
module.exports.canUserReview = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({
        user: req.user._id,
        'orderItems.product': req.query.productId
    });

    if (orders.length === 0) {
        res.status(200).json({
            canReview: false
        });
    } else {
        res.status(200).json({
            canReview: true
        });
    }


});