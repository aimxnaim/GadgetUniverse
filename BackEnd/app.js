const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/error');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});

const app = express();
dotenv.config({ path: 'BackEnd/config/config.env' });

// Database connection
const { connectDatabase } = require('./config/dbConnect');
connectDatabase();

app.use(express.json());

// Importing routes
const productRoutes = require('./routes/product');
app.use('/api/v1', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

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