const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/order');
const Product = require('../models/product');
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

// Get order details => /api/v1/order/:id
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

// Update order - ADMIN => /api/v1/admin/orders/:id
module.exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandler('Order not found with this id', 404));

    if (order?.orderStatus === 'Delivered') return next(new ErrorHandler('You have already delivered this order', 400));

    // Update product stocks
    order?.orderItems?.forEach(async (item) => {
        const product = await Product.findById(item?.product?.toString());
        if (!product) return next(new ErrorHandler('Product not found with this id', 404));
        product.stock = product.stock - item.quantity;
        await product.save({ validateBeforeSave: false });
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
        order
    });
});

// Delete single order => /api/v1/admin/order/:id
module.exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandler('Order not found with this id', 404));

    await order.deleteOne();

    res.status(200).json({
        success: true
    });
});