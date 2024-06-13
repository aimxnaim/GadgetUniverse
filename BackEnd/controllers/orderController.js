const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/order');
const ErrorHandler = require('../utils/errorHandler');

// Create new order => /api/v1/order/new
module.exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Get single order => /api/v1/order/:id
module.exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate(
        'user',
        'name email'
    );

    if (!order) return next(new ErrorHandler('Order not found', 404));

    res.status(200).json({
        success: true,
        order
    });
});

// Get current user order => /api/v1/me/order
module.exports.myOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        order
    });
});

// Get all orders - ADMIN => /api/v1/admin/order
module.exports.allOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find();

    res.status(200).json({
        success: true,
        order
    });
});