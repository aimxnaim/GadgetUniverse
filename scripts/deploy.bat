@echo off
REM Deployment script for GadgetUniverse (Windows)
REM This script resets the database and seeds admin user before deployment

echo Starting deployment process...

REM Set NODE_ENV to PRODUCTION
SET NODE_ENV=PRODUCTION

REM Reset database and seed admin user
echo Resetting database and seeding admin user...
node BackEnd/seed/seedAdmin.js

if %ERRORLEVEL% EQU 0 (
    echo Database reset and seeding completed successfully
) else (
    echo Database reset and seeding failed
    exit /b 1
)

REM Start the application
echo Starting production server...
node BackEnd/app.js
