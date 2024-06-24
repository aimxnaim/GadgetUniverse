const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/error');
const app = express();
const { connectDatabase } = require('./config/dbConnect');
const cookieParser = require('cookie-parser');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});

dotenv.config({ path: 'BackEnd/config/config.env' });

// Database connection
connectDatabase();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser()); // Cookie parser middleware; so that i can access req.cookies; it will parse the cookies and add them to the req object

// Importing all routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

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
})