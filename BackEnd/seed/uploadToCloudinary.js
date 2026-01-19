const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './BackEnd/config/.env' });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a single image to Cloudinary
 * @param {string} imagePath - Local path to the image file
 * @param {string} folder - Cloudinary folder name (default: 'GadgetUniverse/products')
 */
async function uploadImage(imagePath, folder = 'GadgetUniverse/products') {
    try {
        console.log(`Uploading ${imagePath}...`);
        
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { width: 800, height: 800, crop: 'limit' },
                { quality: 'auto' }
            ]
        });

        console.log(`✓ Uploaded successfully!`);
        console.log(`  Public ID: ${result.public_id}`);
        console.log(`  URL: ${result.secure_url}`);
        console.log('');

        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (error) {
        console.error(`✗ Error uploading ${imagePath}:`, error.message);
        return null;
    }
}

/**
 * Upload multiple images from a folder
 * @param {string} folderPath - Path to folder containing images
 */
async function uploadFolder(folderPath) {
    try {
        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );

        console.log(`Found ${imageFiles.length} images in ${folderPath}\n`);

        const results = [];
        for (const file of imageFiles) {
            const fullPath = path.join(folderPath, file);
            const result = await uploadImage(fullPath);
            if (result) {
                results.push(result);
            }
        }

        console.log(`\n✓ Successfully uploaded ${results.length} images`);
        console.log('\nImage data (copy this to use in your seed data):');
        console.log(JSON.stringify(results, null, 2));

        return results;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 * Upload images from URLs
 * @param {string[]} urls - Array of image URLs
 */
async function uploadFromUrls(urls) {
    console.log(`Uploading ${urls.length} images from URLs...\n`);

    const results = [];
    for (const url of urls) {
        try {
            console.log(`Uploading ${url}...`);
            
            const result = await cloudinary.uploader.upload(url, {
                folder: 'GadgetUniverse/products',
                resource_type: 'auto'
            });

            console.log(`✓ Uploaded successfully!`);
            console.log(`  Public ID: ${result.public_id}`);
            console.log(`  URL: ${result.secure_url}\n`);

            results.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        } catch (error) {
            console.error(`✗ Error uploading ${url}:`, error.message);
        }
    }

    console.log(`\n✓ Successfully uploaded ${results.length} images`);
    console.log('\nImage data:');
    console.log(JSON.stringify(results, null, 2));

    return results;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(`
Cloudinary Image Upload Utility
================================

Usage:
  node uploadToCloudinary.js <imagePath>           Upload a single image
  node uploadToCloudinary.js folder <folderPath>   Upload all images from a folder
  node uploadToCloudinary.js url <imageUrl>        Upload image from URL

Examples:
  node uploadToCloudinary.js ./images/product1.jpg
  node uploadToCloudinary.js folder ./images/products
  node uploadToCloudinary.js url https://example.com/image.jpg

Configuration:
  Make sure your .env file has:
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET

Current Config:
  Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME || 'NOT SET'}
  API Key: ${process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NOT SET'}
    `);
    process.exit(0);
}

// Execute based on command
(async () => {
    if (args[0] === 'folder' && args[1]) {
        await uploadFolder(args[1]);
    } else if (args[0] === 'url' && args[1]) {
        await uploadFromUrls([args[1]]);
    } else if (args[0] === 'urls' && args[1]) {
        // Upload multiple URLs (comma-separated)
        const urls = args[1].split(',').map(url => url.trim());
        await uploadFromUrls(urls);
    } else {
        // Single file upload
        await uploadImage(args[0]);
    }
})();
