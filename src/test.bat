@echo off
setlocal enabledelayedexpansion

:: Check if a directory argument was provided
if "%~1"=="" (
    echo Usage: %0 directory
    exit /b 1
)

:: Set the target directory
set "targetDir=%~1"

:: Check if the provided argument is a valid directory
if not exist "%targetDir%" (
    echo Error: The directory "%targetDir%" does not exist.
    exit /b 1
)

:: Function to list subdirectories recursively
call :ListSubdirectories "%targetDir%" 

:: End script
endlocal
pause
exit /b

:: Subroutine to list subdirectories
:ListSubdirectories
setlocal
set "dir=%~1"
set "indent=%2"

:: List the directories in the current directory
for /d %%D in ("%dir%\*") do (
    echo !indent!%%~nxD
    call :ListSubdirectories "%%D" "!indent!  "
)

endlocal
exit /b
