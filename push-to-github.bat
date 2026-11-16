@echo off
title Enviar Projeto para o GitHub
cd /d "%~dp0"

echo ===================================================
echo     PUBLICAR NO GITHUB - KANBANFLOW
echo ===================================================
echo.

:: 1. Garante identidade configurada
git config user.name "tibpo"
git config user.email "tibpo@users.noreply.github.com"

:: 2. Registra todos os arquivos e realiza o commit
git add .
git commit -m "feat: initial commit - KanbanFlow colaborativo em tempo real" >nul 2>&1

:: 3. Define a URL remota do GitHub
set REPO_URL=https://github.com/tibpo/KanbanFlow-.git
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo Repositorio de destino: %REPO_URL%
echo.
echo Enviando arquivos para o GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ============================================================
    echo [AVISO] O GitHub recusou o envio padrao porque o repositorio
    echo ja foi criado com um README ou arquivo inicial.
    echo.
    echo Sincronizando com o repositorio remoto...
    echo ============================================================
    echo.
    git pull origin main --rebase >nul 2>&1
    git push -u origin main

    if %errorlevel% neq 0 (
        echo Tentando envio forcado para atualizar com o projeto completo...
        git push -u origin main --force
    )
)

if %errorlevel% equ 0 (
    echo.
    echo ===================================================
    echo  SUCESSO! Seu projeto foi publicado no GitHub!
    echo  Acesse: https://github.com/tibpo/KanbanFlow-
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo  Ocorreu um erro ao enviar.
    echo  Verifique se voce esta logado no GitHub no navegador
    echo  e se tem permissao no repositorio.
    echo ===================================================
)

echo.
pause
