# 🎯 Quick Guide: Category-Matched Image Seeding

## ✅ What This Does

Fetches **real images from Unsplash** that match each product category:
- 📷 Camera images → Camera products
- 💻 Laptop images → Laptop products  
- 🎧 Headphone images → Headphone products
- 📱 Phone images → Electronics products
- And so on...

## 🚀 One Command to Rule Them All

```bash
# Fetch category-specific images AND seed database
node BackEnd/seed/updateDataWithUnsplash.js && npm run seeder
```

That's it! ✨

## 📊 What You Get

- **106 products** across 12 categories
- Each category has **real, matching images**
- Each product has **2 images** from its category

### Categories:
- 📷 Cameras (12 products)
- 💻 Laptops (12 products)
- 🎧 Headphones (10 products)
- 📱 Electronics (15 products)
- 🔌 Accessories (10 products)
- 🍔 Food (8 products)
- 📚 Books (8 products)
- 👕 Clothes/Shoes (8 products)
- 💄 Beauty/Health (8 products)
- ⚽ Sports (8 products)
- 🏕️ Outdoor (8 products)
- 🏠 Home (8 products)

## 🔧 How It Works

The script:
1. Fetches images from Unsplash using category-specific searches:
   - "camera photography" for Cameras
   - "laptop computer" for Laptops
   - "smartphone mobile phone" for Electronics
   - etc.

2. Creates products and assigns images based on category

3. Writes everything to `data.js`

4. You run `npm run seeder` to update the database

## 🎨 Customization

Edit [updateDataWithUnsplash.js](BackEnd/seed/updateDataWithUnsplash.js) line 31:

```javascript
const categoryMap = {
    'Cameras': { search: 'camera photography', count: 12 },
    'Laptops': { search: 'laptop computer', count: 12 },
    // Add more or change search terms!
};
```

## ⚡ Quick Commands

```bash
# Just fetch and update data.js (no seeding)
node BackEnd/seed/updateDataWithUnsplash.js

# Just seed database (use existing data.js)
npm run seeder

# Do both
node BackEnd/seed/updateDataWithUnsplash.js && npm run seeder
```

## 🔑 Requirements

Your `.env` file must have:
```env
UNSPLASH_ACCESS_KEY=your_key_here
```

## ⚠️ Rate Limits

- **50 requests/hour** (Demo)
- The script makes 12 requests (one per category)
- Safe to run **4 times per hour**

## 📝 Example Output

```javascript
{
  name: "Professional Camera",
  category: "Cameras",
  images: [
    { url: "https://images.unsplash.com/photo-123...camera.jpg" },
    { url: "https://images.unsplash.com/photo-456...camera.jpg" }
  ]
}
```

Images match the product category! 🎉
