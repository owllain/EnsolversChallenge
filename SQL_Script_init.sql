-- Crear la base de datos "notes" si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'notes')
BEGIN
    CREATE DATABASE notes;
    ALTER DATABASE notes SET AUTO_CLOSE OFF;
END
GO

-- Usar la base de datos "notes"
USE notes;
GO

-- Crear la tabla "Notes"
CREATE TABLE Notes
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Categoria NVARCHAR(255),
    Titulo NVARCHAR(255),
    Texto NVARCHAR(MAX),
    Estado NVARCHAR(50)
);
GO
