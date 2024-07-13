const mongoose = require('mongoose');

module.exports.connectDatabase = () => {
    let DB_URI = "";

    if (process.env.NODE_ENV === 'DEVELOPMENT') DB_URI = process.env.DB_LOCAL_URI;
    else if (process.env.NODE_ENV === 'PRODUCTION') DB_URI = process.env.DB_URI;

    mongoose.connect(DB_URI, {})
        .then(() => {
            console.log(`Database connected successfully with host ${mongoose.connection.host}`);
        })
        .catch(err => {
            console.error("Database connection failed:", err);
            process.exit(1); // Optionally exit process if database connection fails
        })
};