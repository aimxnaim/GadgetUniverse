const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/error');
const app = express();
const { connectDatabase } = require('./config/dbConnect');
const cookieParser = require('cookie-parser');
const path = require('path');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});

if (process.env.NODE_ENV === 'DEVELOPMENT') {
    dotenv.config({ path: 'BackEnd/config/.env' });
}

// Database connection
connectDatabase();

app.use(express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));
app.use(cookieParser());

// Importing all routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

// Serve frontend differently based on environment
if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Handle all other routes with React frontend build
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
    });
} else if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(express.static(path.join(__dirname, '../frontend')));

    // Serve unbuilt frontend directly in development
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
    });
}

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});
