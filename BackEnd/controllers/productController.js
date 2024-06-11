const { default: mongoose } = require('mongoose');
const Product = require('../models/product');

// Get all products => /api/v1/products
module.exports.getProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        products
    });
};

// Create new product => /api/v1/admin/products
module.exports.newProduct = (req, res) => {

    const product = Product.create(req.body);
    res.status(200).json({
        product
    });
};

// Get single product details => /api/v1/admin/products/:id
module.exports.getProductDetails = async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found with this ID' });
    }
    else if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
    }
    res.status(200).json({
        product
    });
};

// Update product details => /api/v1/products/:id
module.exports.updateProduct = async (req, res) => {

    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found with this ID' });
    }
    else if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
    }

    product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json({
        product
    });
};

// Delete product => /api/v1/products/:id
module.exports.deleteProduct = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
    }
    let product = await Product.findById(id);
    if (!product) {
        res.status(404).json({
            error: 'Product not found with this ID'
        });
    }

    product = await Product.deleteOne({ _id: id });
    res.status(200).json({
        message: 'Product deleted successfully'
    });
};