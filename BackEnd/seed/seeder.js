const mongoose = require('mongoose');
const Product = require('../models/product');
const products = require('./data');

const seedProducts = async () => {
    try {
        await mongoose.connect(`mongodb+srv://aimxnaim:zxoUbmVEGchx0IzG@gadgetuniverse.niqzb5t.mongodb.net/gadgetUniverse?retryWrites=true&w=majority&appName=gadgetUniverse`);

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