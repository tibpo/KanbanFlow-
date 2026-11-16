@echo off
title KanbanFlow Launcher
cd /d "%~dp0"

echo ===================================================
echo   Iniciando o KanbanFlow...
echo ===================================================
echo.

:: Abre o navegador apos breve espera
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000"

:: Inicia o servidor Node.js
node server.js

pause
