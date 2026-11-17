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

:: 2. Identifica a branch atual
for /f "tokens=*" %%b in ('git branch --show-current') do set CURRENT_BRANCH=%%b
if "%CURRENT_BRANCH%"=="" set CURRENT_BRANCH=frontend

echo Branch atual selecionada: [%CURRENT_BRANCH%]
echo.

:: 3. Registra alteracoes pendentes caso existam
git add .
git commit -m "feat(%CURRENT_BRANCH%): atualizacao de componentes e melhorias" >nul 2>&1

:: 4. Define a URL remota do GitHub
set REPO_URL=https://github.com/tibpo/KanbanFlow-.git
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo Repositorio de destino: %REPO_URL%
echo Enviando branch [%CURRENT_BRANCH%] para o GitHub...
echo.

git push -u origin %CURRENT_BRANCH%

if %errorlevel% neq 0 (
    echo.
    echo Tentando sincronizar com a branch remota...
    git pull origin %CURRENT_BRANCH% --rebase >nul 2>&1
    git push -u origin %CURRENT_BRANCH%

    if %errorlevel% neq 0 (
        echo Tentando envio direto para atualizar a branch no GitHub...
        git push -u origin %CURRENT_BRANCH% --force
    )
)

if %errorlevel% equ 0 (
    echo.
    echo ===================================================
    echo  SUCESSO! Branch [%CURRENT_BRANCH%] enviada ao GitHub!
    echo  Acesse: https://github.com/tibpo/KanbanFlow-/tree/%CURRENT_BRANCH%
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo  Ocorreu um erro ao enviar.
    echo  Verifique sua conexao e permissao no repositorio.
    echo ===================================================
)

echo.
pause
