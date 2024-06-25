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

async function getSalesData(startDate, endDate) {
    const salesData = await Order.aggregate([
        {
            // ? Stage 1 - Filter out the orders between the start and end date
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                },
            },
        },
        {
            // ? Stage 2 - Group the orders by the date
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    }
                },
                totalSales: {
                    $sum: '$totalPrice'
                },
                numOrders: { // * Count the number of orders
                    $sum: 1
                }
            }
        }

    ])

    // Create a map to store the sales data and number of orders by date
    const salesMap = new Map();
    let totalSales = 0;
    let totalNumOrders = 0;

    salesData.forEach((entry) => {
        const date = entry?._id.date;
        const sales = entry?.totalSales;
        const numOrders = entry?.numOrders;

        salesMap.set(date, { sales, numOrders });
        totalSales += sales;
        totalNumOrders += numOrders;
    })



    // Generate an array of dates between the start and end date
    const datesBetween = getDatesBetween(startDate, endDate);

    // Create final sales data array with 0 for days with no sales
    const finalSalesData = datesBetween.map((date) => ({
        date,
        sales: (salesMap.get(date) || { sales: 0 }).sales,
        numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders
    }));

    return { salesData: finalSalesData, totalSales, totalNumOrders };
}

function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

// Get Sales Data => /api/v1/admin/get_sales
module.exports.getSales = catchAsyncError(async (req, res, next) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    startDate.setHours(0, 0, 0, 0); // start at 12:00 am
    endDate.setHours(23, 59, 59, 999); // end at 11:59 pm

    const { salesData, totalSales, totalNumOrders } = await getSalesData(startDate, endDate);

    res.status(200).json({
        totalSales,
        totalNumOrders,
        sales: salesData
    });
});