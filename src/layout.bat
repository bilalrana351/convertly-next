@echo off
setlocal enabledelayedexpansion

:: Check if a directory path is provided as an argument
if "%~1"=="" (
    set "rootDir=%CD%"
) else (
    set "rootDir=%~1"
)

:: Print the root directory
echo Directory structure of: %rootDir%

:: Use the tree command to print the directory structure
tree "%rootDir%" /F

:: Pause to keep the console window open (optional)
pause