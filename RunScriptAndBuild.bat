@echo off
REM Script to create a SQL database and build a Visual Studio solution

REM Set the path to SQLCMD and MSBuild (modify these paths as needed)
set SQLCMD_PATH="C:\Ruta\A\SQLCMD.exe"
set MSBUILD_PATH="C:\Ruta\A\MSBuild.exe"

REM Set the connection parameters for SQLCMD
set SERVER=(local)\SQLEXPRESS
set DATABASE=notes
set TRUSTED_CONNECTION=True
set TRUST_SERVER_CERTIFICATE=True

REM Set the path to your SQL script
set SQL_SCRIPT_PATH="C:\Users\tvlin\OneDrive\Documentos\Workspace\Portfolio\GitHubowllain-Ensolvers-Challenge\SQL_Script_init.sql"

REM Set the path to your Visual Studio solution
set SOLUTION_PATH="C:\Users\tvlin\OneDrive\Documentos\Workspace\Portfolio\GitHubowllain-Ensolvers-Challenge\EnsolversChallenge.sln"

REM Create the database using SQLCMD
%SQLCMD_PATH% -S %SERVER% -d master -E -Q "CREATE DATABASE %DATABASE%;"

REM Run the SQL script to initialize the database
%SQLCMD_PATH% -S %SERVER% -d %DATABASE% -E -i %SQL_SCRIPT_PATH%

REM Build the Visual Studio solution
%MSBUILD_PATH% %SOLUTION_PATH%

REM Pause to keep the command prompt open
pause
