@REM @echo off
@REM REM Deployment script for GadgetUniverse (Windows)
@REM REM This script resets the database and seeds admin user before deployment

@REM echo Starting deployment process...

@REM REM Set NODE_ENV to PRODUCTION
@REM SET NODE_ENV=PRODUCTION

@REM REM Reset database and seed admin user
@REM echo Resetting database and seeding admin user...
@REM node BackEnd/seed/seedAdmin.js

@REM if %ERRORLEVEL% EQU 0 (
@REM     echo Database reset and seeding completed successfully
@REM ) else (
@REM     echo Database reset and seeding failed
@REM     exit /b 1
@REM )

@REM REM Start the application
@REM echo Starting production server...
@REM node BackEnd/app.js
