@echo off
echo ====================================================
echo Starting Unified Deployment Process...
echo ====================================================

cd server

echo Compiling React App and Spring Boot Server...
call mvnw.cmd clean package

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] The build failed. Please make sure you have the Java JDK installed (javac command must be available^).
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Build Successful! Starting the unified Placement Backend...
echo ====================================================
java -jar target/server-0.0.1-SNAPSHOT.jar

pause
