const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');

// Register a user => /api/v1/register
module.exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    });

    // Create token and send to client
    sendToken(user, 200, res);
});

// Login a user => /api/v1/login
module.exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler('Please enter email & password', 400));

    // Find user in database
    const user = await User.findOne({ email }).select('+password'); // ? select() is used to show hidden fields
    if (!user) return next(new ErrorHandler('Invalid email or password', 401));

    // Check if password is correct 
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler('Invalid email or password', 401));

    sendToken(user, 200, res);
})

// Logout user => /api/v1/logout
module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
})