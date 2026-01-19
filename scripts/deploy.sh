#!/bin/bash

# Deployment script for GadgetUniverse
# This script resets the database and seeds admin user before deployment

echo "🚀 Starting deployment process..."

# Set NODE_ENV to PRODUCTION
export NODE_ENV=PRODUCTION

# Reset database and seed admin user
echo "📦 Resetting database and seeding admin user..."
node BackEnd/seed/seedAdmin.js

if [ $? -eq 0 ]; then
    echo "✅ Database reset and seeding completed successfully"
else
    echo "❌ Database reset and seeding failed"
    exit 1
fi

# Start the application
echo "🎯 Starting production server..."
node BackEnd/app.js
