@echo off
echo Starting Todo List Application...

:: Kill any existing processes on ports 3000 and 3001
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

:: Start the application in background using VBScript
start /b wscript.exe run-invisible.vbs

echo Todo List Application has been started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo.
echo NOT: Uygulamayı durdurmak için Görev Yöneticisi'nden node.exe işlemlerini sonlandırabilirsiniz.
pause
