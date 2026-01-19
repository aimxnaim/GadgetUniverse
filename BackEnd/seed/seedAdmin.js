const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const products = require('./data');
require('dotenv').config({ path: 'BackEnd/config/.env' });

const resetAndSeedDatabase = async () => {
    try {
        let DB_URI = "";

        if (process.env.NODE_ENV === 'DEVELOPMENT') {
            DB_URI = process.env.DB_LOCAL_URI;
        } else if (process.env.NODE_ENV === 'PRODUCTION') {
            DB_URI = process.env.DB_URI;
        }
        
        console.log('Connecting to database...');
        await mongoose.connect(DB_URI, {});
        console.log('Connected to database successfully');

        // Delete all existing data
        console.log('Deleting all existing data...');
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('All data deleted successfully');

        // Create admin user
        console.log('Creating admin user...');
        const adminUser = await User.create({
            name: 'Admin Aiman',
            email: 'aiman@gmail.com',
            password: 'aiman12345',
            role: 'admin',
            avatar: {
                public_id: 'default_avatar',
                url: 'https://res.cloudinary.com/default/image/upload/default_avatar.png'
            }
        });
        console.log('Admin user created successfully:', adminUser.email);

        // Optionally seed products
        if (products && products.length > 0) {
            console.log('Seeding products...');
            await Product.insertMany(products);
            console.log(`${products.length} products imported successfully`);
        }

        console.log('\n✅ Database reset and seeding completed successfully!');
        console.log('\n📧 Admin credentials:');
        console.log('   Email: aiman@gmail.com');
        console.log('   Password: aiman12345');
        console.log('   Role: admin\n');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during database reset and seeding:', error.message);
        process.exit(1);
    }
};

resetAndSeedDatabase();
