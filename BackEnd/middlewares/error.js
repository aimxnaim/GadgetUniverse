const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error'
    };

    // Handling Mongoose Validation Error 
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 404);
    }

    // Handle Validation Error 
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Duplicate Key Error 
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT Error 
    if (err.name === 'JSONWebTokenError') {
        const message = `JSON Web Token is invalid. Try again!!!`;
        error = new ErrorHandler(message, 400);
    }

    // Handling Expired JWT Error
    if (err.name === 'TokenExpiredError') {
        const message = `JSON Web Token is expired. Try again!!!`;
        error = new ErrorHandler(message, 400);
    }

    // displaying the error in development mode
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err.stack || ''

        });
    } // displaying the error in production mode
    else if (process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
            message: error.message
        });
    }
}