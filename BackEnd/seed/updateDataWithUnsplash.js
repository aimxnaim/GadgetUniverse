const axios = require('axios');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: './BackEnd/config/.env' });

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

/**
 * Fetch category-specific images from Unsplash
 */
async function fetchCategoryImages(category, count = 10) {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: category,
                per_page: count,
                orientation: 'squarish'
            },
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        return response.data.results.map(photo => photo.urls.regular);
    } catch (error) {
        console.error(`Error fetching ${category} images:`, error.message);
        return [];
    }
}

/**
 * Generate category-specific product names and descriptions
 */
function getCategorySpecificProduct(category, index) {
    const productTemplates = {
        'Cameras': {
            names: ['Professional DSLR Camera', 'Mirrorless Camera', 'Action Camera', 'Instant Camera', 'Film Camera', 
                   'Digital SLR Camera', '4K Video Camera', 'Point and Shoot Camera', 'Medium Format Camera', 
                   'Compact Camera', 'Wildlife Photography Camera', 'Sports Photography Camera'],
            descriptions: [
                'High-resolution sensor with exceptional low-light performance. Perfect for professional photography and videography. Features advanced autofocus system and 4K video recording.',
                'Lightweight mirrorless design with interchangeable lenses. Ideal for travel and street photography. Includes WiFi connectivity and touchscreen display.',
                'Capture stunning images with full manual controls. Built-in image stabilization and weather-sealed body. Professional-grade color accuracy and dynamic range.',
                'Advanced autofocus technology with eye-tracking. Perfect for portraits and wildlife. Features dual card slots and high-speed continuous shooting.'
            ]
        },
        'Laptops': {
            names: ['Gaming Laptop', 'Business Laptop', 'Ultrabook', 'MacBook Pro', 'Dell XPS Laptop', 
                   'HP Pavilion Laptop', 'Lenovo ThinkPad', 'ASUS ROG Gaming Laptop', 'Microsoft Surface Laptop', 
                   '2-in-1 Convertible Laptop', 'Chromebook', 'Workstation Laptop'],
            descriptions: [
                'Powerful processor with high-performance graphics. 16GB RAM and 512GB SSD for lightning-fast performance. Perfect for gaming, video editing, and multitasking.',
                'Sleek aluminum design with stunning display. Long battery life lasting up to 12 hours. Includes backlit keyboard and fingerprint reader for enhanced security.',
                'Ultra-portable with premium build quality. Crystal-clear 4K display and Thunderbolt ports. Ideal for professionals and students on the go.',
                'Latest generation processor with dedicated graphics. Fast charging and all-day battery life. Features precision touchpad and immersive audio system.'
            ]
        },
        'Headphones': {
            names: ['Wireless Bluetooth Headphones', 'Noise Cancelling Headphones', 'Gaming Headset', 'Studio Monitor Headphones',
                   'Sports Earbuds', 'Over-Ear Headphones', 'In-Ear Earphones', 'USB Gaming Headset', 'True Wireless Earbuds',
                   'ANC Headphones', 'DJ Headphones', 'Kids Headphones'],
            descriptions: [
                'Premium sound quality with deep bass and crystal-clear highs. Active noise cancellation blocks out ambient noise. Comfortable over-ear design with 30+ hours battery life.',
                'Wireless freedom with Bluetooth 5.0 connectivity. Built-in microphone for hands-free calls. Foldable design with carrying case included.',
                'Immersive audio experience with 7.1 surround sound. Memory foam ear cushions for all-day comfort. Perfect for music, movies, and gaming.',
                'Studio-quality sound with balanced audio profile. Noise isolation for focused listening. Durable construction with replaceable ear pads.'
            ]
        },
        'Electronics': {
            names: ['iPhone 15 Pro', 'Samsung Galaxy S24', 'Google Pixel 8', 'Smartphone', 'Android Phone',
                   'Wireless Charger', 'Power Bank', 'Smart Watch', 'Tablet', 'E-Reader',
                   'Bluetooth Speaker', 'Streaming Device', 'Smart Home Hub', 'USB-C Cable', 'Phone Case'],
            descriptions: [
                'Latest smartphone with advanced camera system. 5G connectivity and all-day battery life. Stunning OLED display with 120Hz refresh rate.',
                'Fast charging technology with wireless capability. Compact and portable design. Compatible with all major smartphone brands.',
                'High-capacity battery for charging on the go. Multiple USB ports for charging multiple devices. LED indicator and premium aluminum finish.',
                'Smart features with fitness tracking and notifications. Water-resistant design with customizable watch faces. Seamless integration with your smartphone.'
            ]
        },
        'Accessories': {
            names: ['USB-C Hub', 'Wireless Mouse', 'Mechanical Keyboard', 'Laptop Stand', 'Phone Mount',
                   'Cable Organizer', 'Screen Protector', 'Laptop Sleeve', 'External Hard Drive', 'USB Flash Drive',
                   'Webcam', 'Microphone', 'Mouse Pad', 'Laptop Cooling Pad', 'Card Reader'],
            descriptions: [
                'Multi-port connectivity hub with HDMI, USB 3.0, and SD card reader. Compact aluminum design for portability. Perfect for expanding laptop connectivity.',
                'Ergonomic design with precision tracking. Wireless connectivity with long battery life. Compatible with Windows, Mac, and Linux systems.',
                'Premium quality accessory for enhanced productivity. Durable construction with modern design. Easy to use and transport.',
                'Essential tech accessory for daily use. High-quality materials and reliable performance. Great value for money.'
            ]
        },
        'Food': {
            names: ['Organic Apples', 'Fresh Bananas', 'Gourmet Coffee Beans', 'Premium Tea Selection', 'Dark Chocolate Bar',
                   'Almond Butter', 'Honey', 'Olive Oil', 'Pasta', 'Rice',
                   'Protein Bar', 'Trail Mix', 'Dried Fruits', 'Nuts', 'Granola'],
            descriptions: [
                'Premium quality food product sourced from sustainable farms. Rich in nutrients and natural flavors. Perfect for healthy eating and snacking.',
                'Organic and non-GMO certified. Free from artificial preservatives and additives. Packed with vitamins and minerals for a balanced diet.',
                'Delicious taste with authentic ingredients. Carefully selected and quality-tested. Ideal for family meals and special occasions.',
                'Fresh and flavorful with natural goodness. Supports healthy lifestyle choices. Great for meal prep and everyday cooking.'
            ]
        },
        'Books': {
            names: ['Fiction Novel', 'Self-Help Book', 'Cookbook', 'Biography', 'Science Fiction',
                   'Mystery Thriller', 'Business Book', 'History Book', 'Travel Guide', 'Children\'s Book',
                   'Poetry Collection', 'Graphic Novel', 'Educational Textbook', 'Art Book', 'Programming Book'],
            descriptions: [
                'Engaging storytelling with captivating characters. Bestselling author with millions of copies sold. Perfect for book lovers and casual readers alike.',
                'Insightful content with practical wisdom. Learn from experts and thought leaders. Transform your life with proven strategies and advice.',
                'Comprehensive guide with detailed information. Well-researched and expertly written. A must-read for enthusiasts and professionals.',
                'Inspiring and thought-provoking content. Beautifully illustrated with high-quality printing. Makes a perfect gift for any occasion.'
            ]
        },
        'Clothes/Shoes': {
            names: ['Running Shoes', 'Casual Sneakers', 'T-Shirt', 'Jeans', 'Hoodie',
                   'Dress Shoes', 'Sandals', 'Jacket', 'Sweater', 'Shorts',
                   'Athletic Wear', 'Formal Shirt', 'Dress', 'Skirt', 'Winter Boots'],
            descriptions: [
                'Premium quality fabric with comfortable fit. Stylish design perfect for any occasion. Available in multiple colors and sizes.',
                'Durable construction with breathable materials. Modern style that never goes out of fashion. Easy to care for and maintain.',
                'Versatile wardrobe essential for everyday wear. High-quality stitching and attention to detail. Combines comfort with contemporary style.',
                'Fashion-forward design with superior comfort. Perfect for work, casual outings, or special events. True to size with excellent fit.'
            ]
        },
        'Beauty/Health': {
            names: ['Facial Moisturizer', 'Vitamin Supplements', 'Hair Serum', 'Body Lotion', 'Sunscreen',
                   'Lip Balm', 'Face Mask', 'Essential Oils', 'Massage Oil', 'Hand Cream',
                   'Shampoo', 'Conditioner', 'Body Wash', 'Facial Cleanser', 'Eye Cream'],
            descriptions: [
                'Nourishing formula with natural ingredients. Dermatologist-tested and hypoallergenic. Suitable for all skin types and daily use.',
                'Premium quality health and beauty product. Helps improve skin texture and appearance. Cruelty-free and environmentally conscious.',
                'Spa-quality treatment for home use. Rich in vitamins and antioxidants. Visible results with regular application.',
                'Gentle yet effective formula. Free from harmful chemicals and parabens. Promotes healthy, glowing skin naturally.'
            ]
        },
        'Sports': {
            names: ['Yoga Mat', 'Dumbbells', 'Resistance Bands', 'Jump Rope', 'Gym Bag',
                   'Water Bottle', 'Fitness Tracker', 'Exercise Ball', 'Foam Roller', 'Kettlebell',
                   'Pull-up Bar', 'Ab Roller', 'Ankle Weights', 'Gym Gloves', 'Sports Watch'],
            descriptions: [
                'Professional-grade fitness equipment for home or gym use. Durable construction built to last. Perfect for beginners and advanced athletes.',
                'High-quality sports gear for optimal performance. Ergonomic design for comfort during workouts. Helps achieve fitness goals effectively.',
                'Essential training tool for strength and conditioning. Versatile and easy to use. Suitable for all fitness levels and workout routines.',
                'Innovative design with premium materials. Enhances workout experience and results. Trusted by fitness enthusiasts worldwide.'
            ]
        },
        'Outdoor': {
            names: ['Camping Tent', 'Hiking Backpack', 'Sleeping Bag', 'Camping Stove', 'Headlamp',
                   'Water Filter', 'Trekking Poles', 'Camping Chair', 'Cooler', 'Hammock',
                   'Binoculars', 'Compass', 'Survival Kit', 'Camping Cookware', 'Portable Grill'],
            descriptions: [
                'Rugged and weather-resistant outdoor gear. Lightweight and portable for easy transport. Perfect for camping, hiking, and adventures.',
                'Built for extreme conditions and durability. Features multiple compartments and organization. Essential equipment for outdoor enthusiasts.',
                'High-performance gear for the great outdoors. Easy to set up and pack away. Trusted quality for wilderness exploration.',
                'Adventure-ready with practical features. Compact design without compromising functionality. Ideal for backpacking and camping trips.'
            ]
        },
        'Home': {
            names: ['Table Lamp', 'Wall Art', 'Throw Pillow', 'Area Rug', 'Storage Basket',
                   'Picture Frame', 'Candle Holder', 'Vase', 'Wall Clock', 'Mirror',
                   'Curtains', 'Bed Sheets', 'Towel Set', 'Kitchen Utensils', 'Dinnerware Set'],
            descriptions: [
                'Elegant home decor piece to enhance any room. Premium quality materials and craftsmanship. Adds style and functionality to your living space.',
                'Modern design that complements various interior styles. Durable and easy to maintain. Perfect for home improvement and decoration.',
                'Beautiful addition to your home interior. Carefully designed with attention to detail. Creates a warm and inviting atmosphere.',
                'Practical and stylish home essential. High-quality construction for long-lasting use. Transforms your house into a comfortable home.'
            ]
        }
    };

    const template = productTemplates[category];
    const name = template.names[index % template.names.length];
    const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
    
    return { name, description };
}

/**
 * Generate products with category-matched images
 */
async function generateProductsWithMatchedImages() {
    console.log('\n🔄 Fetching category-specific images from Unsplash...\n');

    // Define categories with their Unsplash search terms
    const categoryMap = {
        'Cameras': { search: 'camera photography', count: 12 },
        'Laptops': { search: 'laptop computer', count: 12 },
        'Headphones': { search: 'headphones audio', count: 10 },
        'Electronics': { search: 'smartphone mobile phone', count: 15 },
        'Accessories': { search: 'tech accessories gadget', count: 10 },
        'Food': { search: 'food grocery', count: 8 },
        'Books': { search: 'books reading', count: 8 },
        'Clothes/Shoes': { search: 'fashion clothing shoes', count: 8 },
        'Beauty/Health': { search: 'beauty cosmetics health', count: 8 },
        'Sports': { search: 'sports fitness equipment', count: 8 },
        'Outdoor': { search: 'outdoor adventure camping', count: 8 },
        'Home': { search: 'home decor furniture', count: 8 }
    };

    // Fetch images for each category
    const categoryImages = {};
    for (const [category, config] of Object.entries(categoryMap)) {
        console.log(`Fetching ${config.count} images for ${category}...`);
        const images = await fetchCategoryImages(config.search, config.count);
        categoryImages[category] = images;
        console.log(`✓ Got ${images.length} images for ${category}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit delay
    }

    console.log('\n✓ All images fetched!\n');
    console.log('🔄 Generating products...\n');

    // Generate products with matched images
    const products = [];
    const sellers = ['Amazon', 'Ebay', 'Best Buy', 'Walmart', 'Target', 'Apple Store', 'Samsung', 'Sony', 'Microsoft', 'Dell'];
    
    // Generate 10 products per category
    for (const [category, images] of Object.entries(categoryImages)) {
        if (images.length === 0) continue;

        const productsPerCategory = Math.min(10, images.length);
        
        for (let i = 0; i < productsPerCategory; i++) {
            const img1 = images[i % images.length];
            const img2 = images[(i + 1) % images.length];
            
            // Get category-specific product name and description
            const productInfo = getCategorySpecificProduct(category, i);

            products.push({
                name: productInfo.name,
                price: parseFloat(faker.commerce.price(10, 1000, 2)),
                description: productInfo.description,
                ratings: parseFloat((Math.random() * 5).toFixed(1)),
                images: [
                    {
                        public_id: `shopit/${category.toLowerCase()}_${i}_1`,
                        url: img1,
                    },
                    {
                        public_id: `shopit/${category.toLowerCase()}_${i}_2`,
                        url: img2,
                    },
                ],
                category: category,
                seller: sellers[Math.floor(Math.random() * sellers.length)],
                stock: Math.floor(Math.random() * 100) + 1,
                numOfReviews: Math.floor(Math.random() * 50),
                reviews: [],
            });
        }
    }

    console.log(`✓ Generated ${products.length} products with category-matched images!\n`);
    return products;
}

/**
 * Update data.js with category-matched products
 */
async function updateDataWithUnsplash() {
    console.log('═══════════════════════════════════════════════');
    console.log('   UNSPLASH CATEGORY-MATCHED IMAGE SEEDER');
    console.log('═══════════════════════════════════════════════\n');

    if (!UNSPLASH_ACCESS_KEY) {
        console.error('❌ UNSPLASH_ACCESS_KEY not found in .env file!');
        process.exit(1);
    }

    try {
        const products = await generateProductsWithMatchedImages();

        // Write to data.js
        const dataJsPath = path.join(__dirname, 'data.js');
        const content = `// Generated: ${new Date().toISOString()}\n// Category-matched images from Unsplash\n\nmodule.exports = ${JSON.stringify(products, null, 2)};\n`;
        
        fs.writeFileSync(dataJsPath, content);

        console.log('✓ Updated data.js successfully!');
        console.log(`✓ Created ${products.length} products with category-matched images\n`);
        console.log('Next step: Run "npm run seeder"\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

updateDataWithUnsplash();
