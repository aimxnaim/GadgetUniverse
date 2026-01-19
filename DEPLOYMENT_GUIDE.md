# GadgetUniverse Deployment Guide

## Automatic Database Reset and Admin Seeding

This guide explains how to automatically reset your database and seed an admin user when deploying to production.

## Admin Credentials

After deployment, you can login with:
- **Email**: aiman@gmail.com
- **Password**: aiman12345
- **Role**: admin

## Setup Instructions

### Method 1: Using NPM Scripts (Local/Manual Deployment)

#### Available Commands:

```bash
# Reset database and seed admin (Development environment)
npm run seed:admin

# Reset database and seed admin (Production environment)
npm run seed:prod

# Deploy: Reset DB, seed admin, and start production server
npm run deploy

# Fresh deployment (all in one command)
npm run deploy:fresh
```

#### Usage:
```bash
# Before pushing to production, you can test locally:
npm run seed:admin

# When deploying manually:
npm run deploy:fresh
```

### Method 2: Using Deployment Scripts

#### For Windows:
```bash
# Run the deployment batch script
.\scripts\deploy.bat
```

#### For Linux/Mac:
```bash
# Make script executable (first time only)
chmod +x scripts/deploy.sh

# Run the deployment script
./scripts/deploy.sh
```

### Method 3: GitHub Actions (Automated CI/CD)

The project includes a GitHub Actions workflow that automatically:
1. Resets the database
2. Seeds the admin user
3. Deploys to production

#### Setup Steps:

1. **Add Secrets to GitHub Repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `DB_URI`: Your production MongoDB connection string
     - `JWT_TOKEN`: Your JWT secret token
     - `JWT_EXPIRES_TIME`: JWT expiration time (e.g., "7d")
     - Add any other hosting-specific secrets (Heroku, Railway, Render, etc.)

2. **Enable GitHub Actions:**
   - The workflow file is located at `.github/workflows/deploy.yml`
   - It automatically triggers when you push to the `main` branch

3. **Trigger Deployment:**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

### Method 4: Platform-Specific Deployment

#### Heroku:
```json
{
  "scripts": {
    "heroku-postbuild": "npm install && npm run seed:prod"
  }
}
```

Add to your `Procfile`:
```
release: npm run seed:prod
web: npm start
```

#### Railway:
Set build command:
```bash
npm install && npm run seed:prod
```

Set start command:
```bash
npm start
```

#### Render:
Set build command:
```bash
npm install && npm run seed:prod
```

Set start command:
```bash
npm start
```

## What Gets Reset?

The seeding script (`BackEnd/seed/seedAdmin.js`) will:
1. ✅ Delete all users
2. ✅ Delete all products
3. ✅ Delete all orders
4. ✅ Create admin user (aiman@gmail.com)
5. ✅ Seed products from data.js (optional)

## Important Security Notes

⚠️ **WARNING**: This will DELETE ALL DATA in your database!

- Only use this for development/testing or when you intentionally want to reset production
- Consider backing up your database before running these commands
- In production, you may want to modify the script to only seed the admin if it doesn't exist

## Customization

### Modify Admin User:
Edit `BackEnd/seed/seedAdmin.js`:
```javascript
const adminUser = await User.create({
    name: 'Your Name',
    email: 'your-email@example.com',
    password: 'your-password',
    role: 'admin',
    avatar: {
        public_id: 'default_avatar',
        url: 'https://your-avatar-url.com'
    }
});
```

### Skip Product Seeding:
In `BackEnd/seed/seedAdmin.js`, comment out the product seeding section:
```javascript
// if (products && products.length > 0) {
//     console.log('Seeding products...');
//     await Product.insertMany(products);
//     console.log(`${products.length} products imported successfully`);
// }
```

### Create Multiple Admin Users:
```javascript
const adminUsers = [
    {
        name: 'Admin 1',
        email: 'admin1@gmail.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Admin 2',
        email: 'admin2@gmail.com',
        password: 'password456',
        role: 'admin'
    }
];

await User.insertMany(adminUsers);
```

## Troubleshooting

### Database Connection Issues:
- Verify your `DB_URI` in `BackEnd/config/.env`
- Ensure MongoDB Atlas allows connections from your IP
- Check if `NODE_ENV` is set correctly

### Script Fails:
```bash
# Check Node version
node --version  # Should be 14+

# Verify dependencies
npm install

# Test database connection
npm run seed:admin
```

## Testing

Before deploying to production, test locally:
```bash
# Set to development mode
SET NODE_ENV=DEVELOPMENT

# Run the seeder
npm run seed:admin

# Start the server
npm run dev

# Login with admin credentials:
# Email: aiman@gmail.com
# Password: aiman12345
```
