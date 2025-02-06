# MERN Stack eCommerce Site 🛒

This project is a full-fledged eCommerce site built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes robust features for product management, user authentication, authorization, order processing, and more. 

This project is well equip with the **Redux Toolkit** for flawless state management, seamlessly process payments with **Stripe**, manage images effortlessly with **Cloudinary**

The estimation time for me is still in progress. 👨‍💻

## Features 🏭

#### Backend Error Handling

- Managed unhandled promise rejections and uncaught exceptions using global error handling middleware.
- Caught async errors to prevent server crashes and improve error reporting.
- Handled specific errors such as Mongoose ID errors gracefully.

#### Authentication & Authorization

- Encrypted user passwords using bcrypt during registration for enhanced security.
- Implemented JSON Web Token (JWT) based authentication.
- Stored JWT securely in HTTP Only cookies for protection against XSS attacks.
- Generated tokens for forgot password functionality and configured Nodemailer for sending reset password emails.

## Deployment 🚀

#### Deployment on Render.com

- Configured environment variables for secure storage of sensitive information like API keys and database connection strings.

## Tech Stack 🔨
- **Frontend**: React.js, Redux, Redux Toolkit, HTML5, CSS3 (with Bootstrap)<br><br>
[![My Skills](https://skillicons.dev/icons?i=react,redux,bootstrap)](https://skillicons.dev)
- **Backend**: Node.js, Express.js<br><br>
[![My Skills](https://skillicons.dev/icons?i=nodejs,npm,express)](https://skillicons.dev)

- **Database**: MongoDB (with Mongoose)<br><br>
[![My Skills](https://skillicons.dev/icons?i=mongodb)](https://skillicons.dev)

- **Authentication**: JSON Web Tokens (JWT), bcrypt, Nodemailer
- **Payment**: Stripe integration
- **Deployment**: Render.com

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any new features or fixes. 🐛
