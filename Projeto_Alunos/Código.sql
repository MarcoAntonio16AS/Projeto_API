CREATE DATABASE Trabalho_TASI;

USE Trabalho_TASI;
CREATE TABLE alunos (
	id 			INT 			AUTO_INCREMENT 		PRIMARY KEY,
	nome 		VARCHAR(100),
	email 		VARCHAR(100),
	nota1 		INT,
	nota2 		INT,
	notaFinal 	INT,
	status 		VARCHAR(20)
);

-- Testar se está funcionando
SELECT * FROM alunos; 