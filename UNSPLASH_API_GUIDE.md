# 📸 Unsplash API Integration Guide

## ✅ What We've Done

I've integrated the Unsplash API into your project to fetch **real tech product images** dynamically!

### Current Setup:
- ✓ Added Unsplash API keys to `.env`
- ✓ Installed `axios` for API requests
- ✓ Created 3 utility scripts for image management
- ✓ Fetched **82 real tech images** from Unsplash
- ✓ Updated database with 100 products using these images

---

### API Limits:
- **Demo/Development**: 50 requests/hour
- **Production**: 5,000 requests/hour (after registering at https://unsplash.com/oauth/applications)

---

## 🛠️ How to Use the Scripts

### 1️⃣ Fetch Images Only (Save to JSON)
```bash
# Fetch 100 images
node BackEnd/seed/fetchUnsplashImages.js 100

# Fetch with custom query
node BackEnd/seed/fetchUnsplashImages.js 50 "laptop computer"
```

**Output:**
- `unsplash_images_full.json` - Full image data (URLs, photographer, description)
- `unsplash_images_urls.json` - Just the URLs for quick use

### 2️⃣ Auto-Update data.js with Fresh Images
```bash
node BackEnd/seed/updateDataWithUnsplash.js
```

This will:
- Fetch 150 tech images from Unsplash
- Update `BackEnd/seed/data.js` with new image URLs
- Use variety of tech queries (smartphone, laptop, camera, etc.)

### 3️⃣ Seed Database
```bash
npm run seeder
```

---

## 📖 How the Unsplash API Works

### Basic Concept:
The Unsplash API provides free access to millions of high-quality photos. Here's how we use it:

### API Endpoint:
```
GET https://api.unsplash.com/search/photos
```

### Parameters:
```javascript
{
  query: 'smartphone tech',      // Search term
  page: 1,                        // Page number
  per_page: 30,                   // Results per page (max 30)
  orientation: 'squarish',        // Image orientation
  order_by: 'relevant'            // Sort order
}
```

### Authentication:
```javascript
headers: {
  'Authorization': 'Client-ID YOUR_ACCESS_KEY'
}
```

### Example Request:
```javascript
const axios = require('axios');

const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
        query: 'technology',
        per_page: 30
    },
    headers: {
        'Authorization': 'Client-ID 6q_jxzZpP_0ENFs7T5Rw6M3jb4doRGzZ2nVkRPIBVFQ'
    }
});

const images = response.data.results.map(photo => ({
    url: photo.urls.regular,
    description: photo.alt_description,
    photographer: photo.user.name
}));
```

---

## 🎯 What Our Scripts Do

### `fetchUnsplashImages.js`
**Purpose**: Fetch tech images from Unsplash

**Features**:
- Searches multiple tech-related queries:
  - `technology gadget`
  - `electronics device`
  - `smartphone tech`
  - `laptop computer`
  - `headphones audio`
  - `camera photography`
  - `smart watch`
  - `tablet device`
  - `gaming console`
  - `tech product`
- Rotates queries for variety
- Respects API rate limits (1-second delay between requests)
- Returns square-oriented images (best for products)
- Saves full metadata and simple URLs

**Usage**:
```bash
# Fetch 100 images
node BackEnd/seed/fetchUnsplashImages.js 100

# Fetch 50 images with custom search
node BackEnd/seed/fetchUnsplashImages.js 50 "headphones"
```

### `updateDataWithUnsplash.js`
**Purpose**: Automatically update data.js with fresh images

**What it does**:
1. Fetches 150 tech images from Unsplash
2. Extracts just the URLs
3. Replaces the `placeholderImages` array in `data.js`
4. Keeps all other faker logic intact

**Usage**:
```bash
node BackEnd/seed/updateDataWithUnsplash.js
```

---

## 🔍 Understanding the Code

### 1. Making the API Request

```javascript
const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
        query: 'smartphone tech',
        page: 1,
        per_page: 30,
        orientation: 'squarish'
    },
    headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
});
```

### 2. Processing the Response

```javascript
const results = response.data.results;

results.forEach(photo => {
    images.push({
        url: photo.urls.regular,        // High-quality image URL
        thumb: photo.urls.thumb,        // Thumbnail URL
        small: photo.urls.small,        // Small size URL
        description: photo.description,  // Image description
        photographer: photo.user.name   // Photographer name
    });
});
```

### 3. Using in Seed Data

```javascript
const placeholderImages = [
    'https://images.unsplash.com/photo-1234...',
    'https://images.unsplash.com/photo-5678...',
    // ... 80+ more URLs
];

// Randomly select images for each product
for (let i = 0; i < 100; i++) {
    const randomImage1 = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    const randomImage2 = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(10, 1000, 2)),
        images: [
            { public_id: `product_${i}_1`, url: randomImage1 },
            { public_id: `product_${i}_2`, url: randomImage2 }
        ],
        // ... other fields
    });
}
```

---

## 🔄 Workflow to Refresh Images

When you want new images:

```bash
# Step 1: Fetch fresh images and update data.js
node BackEnd/seed/updateDataWithUnsplash.js

# Step 2: Seed the database
npm run seeder

# Step 3: Start your app
npm run dev
```

---

## 💡 Customization Options

### Change Search Queries
Edit `fetchUnsplashImages.js`, line ~24:

```javascript
const techQueries = [
    'technology gadget',
    'electronics device',
    'smartphone tech',
    'your custom query here'  // Add your own!
];
```

### Change Number of Images per Product
Edit `data.js`:

```javascript
images: [
    { public_id: `product_${i}_1`, url: randomImage1 },
    { public_id: `product_${i}_2`, url: randomImage2 },
    { public_id: `product_${i}_3`, url: randomImage3 },  // Add more!
],
```

### Change Image Quality
In `fetchUnsplashImages.js`, change `photo.urls.regular` to:
- `photo.urls.full` - Full resolution (largest)
- `photo.urls.regular` - Regular size (1080px)
- `photo.urls.small` - Small size (400px)
- `photo.urls.thumb` - Thumbnail (200px)

---

## 📊 Current Status

### Database Status:
- ✅ 100 products seeded
- ✅ 82 unique tech images from Unsplash
- ✅ Each product has 2 random images
- ✅ All images are real, working URLs

### Files Created:
1. `BackEnd/seed/fetchUnsplashImages.js` - Main fetching script
2. `BackEnd/seed/updateDataWithUnsplash.js` - Auto-update script
3. `BackEnd/seed/unsplash_images_full.json` - Full image metadata
4. `BackEnd/seed/unsplash_images_urls.json` - Simple URL list

---

## ⚠️ Important Notes

### Rate Limits:
- You have **50 requests per hour** on the demo plan
- Each request can fetch up to 30 images
- We add 1-second delays to avoid hitting limits

### Attribution:
According to Unsplash guidelines, you should credit photographers when possible. Our full JSON includes:
```javascript
{
    url: "https://images.unsplash.com/...",
    photographer: "John Doe",
    photographer_url: "https://unsplash.com/@johndoe"
}
```

### Production Use:
For production apps with high traffic, register your app at:
https://unsplash.com/oauth/applications

This increases your limit to 5,000 requests/hour.

---

## 🚀 Next Steps

1. **View your products**: Start your app and check the product images
2. **Refresh weekly**: Run `updateDataWithUnsplash.js` weekly for fresh content
3. **Add categories**: Modify queries to fetch category-specific images
4. **Upload to Cloudinary**: Use the images + `uploadToCloudinary.js` to store permanently

---

## 🐛 Troubleshooting

### "Rate limit exceeded"
Wait an hour or register for production access.

### "No images found"
Try broader search queries like "technology" or "electronics".

### "Invalid access key"
Check your `.env` file - make sure `UNSPLASH_ACCESS_KEY` is set correctly.

---

## 📚 Resources

- Unsplash API Docs: https://unsplash.com/documentation
- API Guidelines: https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
- Register App: https://unsplash.com/oauth/applications
