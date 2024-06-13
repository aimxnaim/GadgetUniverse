const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/user');
const { getResetPasswordTemplate } = require('../utils/emailTemplate');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/sendToken');
const crypto = require('crypto');

// ? Register a user => /api/v1/register
module.exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    });

    // Create token and send to client
    sendToken(user, 200, res);
});

// ? Login a user => /api/v1/login
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

// ? Logout user => /api/v1/logout
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

// ? Forgot Password => /api/v1/password/forgot
module.exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    // Find user in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorHandler('User not found with this email', 404));

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    // Message to send to user's email
    const message = getResetPasswordTemplate(user?.name, resetUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: 'GadgetUniverse Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorHandler(error.message, 500));
    }
});

// ? Reset Password => /api/v1/password/reset/:token
module.exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Hash the URL token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));

    // Set new password ; check if password matches
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Password does not match', 400));

    // Set up the new password
    user.password = req.body.password;

    // Reset the resetPasswordToken and resetPasswordExpire
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get the current user profile => /api/v1/me
module.exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.user?._id);
    res.status(200).json({
        user
    });
})

// Update password current user => /api/v1/password/update
module.exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.user?._id).select('+password');
    const { oldPassword, newPassword } = req.body;

    // Check if old password is correct
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) return next(new ErrorHandler('Old password is incorrect', 400));

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        user
    });
})