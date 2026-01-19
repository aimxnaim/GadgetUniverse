# GadgetUniverse 🛒

A full-stack eCommerce platform for tech products built with the MERN stack.

## Tech Stack

- **Frontend**: React.js + Vite, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: Unsplash API (product images), Stripe (payments)
- **Cloud**: Cloudinary (image storage)

## Quick Start

### 1. Install Dependencies
```bash
npm install
cd frontend && npm install
```

### 2. Setup Environment
Create `BackEnd/config/.env`:
```env
PORT=4001
DB_LOCAL_URI=mongodb://127.0.0.1:27017/gadgetUniverse
JWT_TOKEN=your_jwt_secret
UNSPLASH_ACCESS_KEY=your_unsplash_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
```

### 3. Seed Database with Real Product Data
```bash
# Fetch category-matched images from Unsplash and seed database
node BackEnd/seed/updateDataWithUnsplash.js && npm run seeder
```

This fetches real images for 12 categories:
- 📷 Cameras (12 products)
- 💻 Laptops (12 products)
- 🎧 Headphones (10 products)
- 📱 Electronics (15 products)
- And 8 more categories...

### 4. Run Application
```bash
# Backend
npm run dev

# Frontend (new terminal)
cd frontend && npm run dev
```

## Backend Features

### Error Handling
- Global error middleware for unhandled promise rejections
- Async error wrapper to catch all async errors
- Custom error handler for Mongoose validation errors
- Environment-specific error responses (dev/prod)

### Authentication & Authorization
- JWT-based authentication with HTTP-only cookies
- Password encryption using bcrypt
- Email verification with Nodemailer
- Role-based access control (user/admin)
- Forgot password with secure token generation

### API Features
- RESTful API design
- Advanced filtering, sorting, and pagination
- Product search with multiple criteria
- Image upload with Cloudinary integration
- Order processing and tracking
- Secure payment with Stripe

## Project Structure
```
GadgetUniverse/
├── BackEnd/
│   ├── config/          # Database & environment config
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Auth, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── seed/            # Database seeder with Unsplash
│   └── utils/           # Helper functions
├── frontend/
│   └── src/
│       ├── actions/     # Redux actions & API calls
│       ├── components/  # React components
│       └── constants/   # App constants
```

## API Endpoints

### Products
- `GET /api/v1/products` - Get all products (with filters)
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/admin/products/new` - Create product (admin)
- `PUT /api/v1/admin/products/:id` - Update product (admin)
- `DELETE /api/v1/admin/products/:id` - Delete product (admin)

### Authentication
- `POST /api/v1/register` - Register user
- `POST /api/v1/login` - Login user
- `POST /api/v1/logout` - Logout user
- `POST /api/v1/password/forgot` - Forgot password
- `PUT /api/v1/password/reset/:token` - Reset password

### Orders
- `POST /api/v1/orders/new` - Create order
- `GET /api/v1/orders/:id` - Get order details
- `GET /api/v1/me/orders` - Get my orders
- `GET /api/v1/admin/orders` - Get all orders (admin)

## Contributing

Contributions are welcome! Fork the repository and create a pull request.
