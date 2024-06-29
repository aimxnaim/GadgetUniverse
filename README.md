# MERN Stack eCommerce Site 🛒

This project is a full-fledged eCommerce site built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes robust features for product management, user authentication, authorization, order processing, and more. 

This project is well equip with the **Redux Toolkit** for flawless state management, seamlessly process payments with **Stripe**, manage images effortlessly with **Cloudinary**

[![Visit My Website](https://img.shields.io/badge/Visit-My%20Website-blue?style=for-the-badge&logo=google-chrome&logoColor=white)]([https://gadgetuniverse.onrender.com](https://gadgetuniverse.onrender.com/))

## Features

### Backend Features

#### Adding Products Resource

- Implemented CRUD operations for managing products.
- Integrated Cloudinary for handling multiple image uploads per product.

#### Backend Error Handling

- Managed unhandled promise rejections and uncaught exceptions using global error handling middleware.
- Caught async errors to prevent server crashes and improve error reporting.
- Handled specific errors such as Mongoose ID errors gracefully.

#### Authentication & Authorization

- Encrypted user passwords using bcrypt during registration for enhanced security.
- Implemented JSON Web Token (JWT) based authentication.
- Stored JWT securely in HTTP Only cookies for protection against XSS attacks.
- Generated tokens for forgot password functionality and configured Nodemailer for sending reset password emails.

#### User Routes

- Created RESTful API routes for user registration, login, profile management, and password reset.

#### Adding Orders Resource

- Implemented functionalities for users to place orders, view order history, and manage current orders.

#### User Reviews

- Allowed authenticated users to submit reviews and ratings for products.

#### Admin Routes

- Developed admin dashboard with:
  - Ability to view and manage orders and products.
  - CRUD operations for products including creation, update, and deletion.
  - User management features to update user roles and permissions.
  - Integration of sales charts for data visualization.

### Frontend Features

#### Implementing Redux Toolkit

- Used Redux Toolkit for efficient state management, reducing boilerplate code and improving scalability.

#### Adding Pagination, Search & Filters

- Implemented pagination for product listings to enhance browsing experience.
- Integrated search functionality to allow users to find products by name or category.
- Applied filters to refine product searches based on price range, category, and availability.

#### Users & Authentication Frontend

- Designed responsive user interfaces for registration, login, and profile management.
- Integrated forms with client-side validation for improved user experience.

#### Adding Shopping Cart

- Implemented a shopping cart feature with functionalities for adding, updating, and removing items.
- Calculated subtotal and total prices dynamically based on cart contents.

#### Handle Checkout & Payments

- Integrated Stripe for secure card payments during checkout.
- Implemented error handling and form validation to ensure smooth transaction processing.

#### User Orders & Reviews

- Displayed order history and review sections for authenticated users to track past purchases and submit product feedback.

### Deployment

#### Deployment on Render.com

- Deployed the application on Render.com for its simplicity and scalability.
- Configured environment variables for secure storage of sensitive information like API keys and database connection strings.

## Technologies Used

- **Frontend**: React.js, Redux, Redux Toolkit, HTML5, CSS3 (with Bootstrap)
- **Backend**: Node.js, Express.js, MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt, Nodemailer
- **Payment**: Stripe integration
- **Deployment**: Render.com

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any new features or fixes.

## Acknowledgements

- Acknowledge any third-party libraries or resources used in your project.
