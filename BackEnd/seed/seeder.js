const mongoose = require('mongoose');
const Product = require('../models/product');
const products = require('./data');
require('dotenv').config({ path: 'BackEnd/config/.env' });

const seedProducts = async () => {
    try {
        let DB_URI = "";

        if (process.env.NODE_ENV === 'DEVELOPMENT') DB_URI = process.env.DB_LOCAL_URI;
        else if (process.env.NODE_ENV === 'PRODUCTION') DB_URI = process.env.DB_URI;
        
        await mongoose.connect(DB_URI, {});

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log('Data imported successfully');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();