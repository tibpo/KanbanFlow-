@echo off
title Enviar Projeto para o GitHub
cd /d "%~dp0"

echo ===================================================
echo     PUBLICAR NO GITHUB - KANBANFLOW
echo ===================================================
echo.

:: 1. Verifica se nome e email estao configurados no Git
for /f "tokens=*" %%i in ('git config user.name') do set GIT_NAME=%%i
for /f "tokens=*" %%i in ('git config user.email') do set GIT_EMAIL=%%i

if "%GIT_NAME%"=="" (
    set /p GIT_NAME="Digite seu nome (ou usuario do GitHub): "
    git config user.name "%GIT_NAME%"
)
if "%GIT_EMAIL%"=="" (
    set /p GIT_EMAIL="Digite seu e-mail do GitHub: "
    git config user.email "%GIT_EMAIL%"
)

echo.
echo Identidade Git confirmada: %GIT_NAME%
echo.

:: 2. Registra todos os arquivos e realiza o commit
git add .
git commit -m "feat: initial commit - KanbanFlow colaborativo em tempo real"

:: 3. Solicita a URL do repositorio remoto
echo.
echo ===================================================
echo   Cole a URL do seu repositorio vazio no GitHub
echo   Exemplo: https://github.com/seu-usuario/kanban-app.git
echo ===================================================
echo.
set /p REPO_URL="URL do Repositorio GitHub: "

if not "%REPO_URL%"=="" (
    git remote remove origin 2>nul
    git remote add origin %REPO_URL%
    git branch -M main
    echo.
    echo Enviando arquivos para a branch main do GitHub...
    git push -u origin main
    echo.
    echo ===================================================
    echo  Sucesso! Seu projeto foi publicado no GitHub!
    echo ===================================================
) else (
    echo.
    echo Nenhuma URL informada. O commit local foi salvo com sucesso.
)

pause
