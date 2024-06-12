const jwt = require('jsonwebtoken');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');

// Check if user is authenticated or not
module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler('Login first to access this resource.', 401));

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    ////console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
});
