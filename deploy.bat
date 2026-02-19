@echo off
echo ========================================
echo       Auto-Deploy to GitHub
echo ========================================
echo.

:: Stage all changes
echo Staging changes...
git add .

:: Prompt for commit message
set /p commit_msg="Enter commit message (Press Enter for 'Auto-update'): "
if "%commit_msg%"=="" set commit_msg=Auto-update

:: Commit changes
echo Committing with message: "%commit_msg%"...
git commit -m "%commit_msg%"

:: Push to GitHub
echo Pushing to origin main...
git push origin main

echo.
:: Push tags to GitHub
echo Pushing tags to origin...
git push origin --tags

echo.
echo ========================================
echo       Deployment Complete!
echo ========================================
pause


