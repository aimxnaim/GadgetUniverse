const { default: mongoose } = require('mongoose');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const APIFilters = require('../utils/apiFilters');

// Get all products => /api/v1/products
module.exports.getProducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query)
        .search()
        .filter();

    console.log(`req.user : ${req.user}`)

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


// Get single product details => /api/v1/admin/products/:id
module.exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
    }
    res.status(200).json({
        product
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

// Delete product => /api/v1/products/:id
module.exports.deleteProduct = catchAsyncErrors(async (req, res) => {

    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler('Product not found with this ID', 404));
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
                review.user = user;
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

    const product = await Product.findById(req.query.id);

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