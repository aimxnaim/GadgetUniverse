class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor); // This is used to capture the stack trace of the error
    }
}

module.exports = ErrorHandler;