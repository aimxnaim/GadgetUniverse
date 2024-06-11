const { default: mongoose } = require('mongoose');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');

// Get all products => /api/v1/products
module.exports.getProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        products
    });
});

// Create new product => /api/v1/admin/products
module.exports.newProduct = catchAsyncErrors(async (req, res) => {

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