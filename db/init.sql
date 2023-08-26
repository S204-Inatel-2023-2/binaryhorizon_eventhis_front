-- Criação das tabelas
CREATE TYPE RoleEnum AS ENUM ('participant', 'creator', 'administrator');

CREATE TABLE appUser (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(20),
    linkedin VARCHAR(255),
    picture VARCHAR(255),
    company VARCHAR(255),
    role RoleEnum
);

CREATE TABLE Administrator (
    userId INT PRIMARY KEY,
    FOREIGN KEY (userId) REFERENCES appUser (id)
);

CREATE TABLE Event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    picture VARCHAR(255),
    creatorId INT REFERENCES appUser (id)
);

-- Inserção de dados de exemplo
INSERT INTO appUser (name, email, password, phone, linkedin, picture, role)
VALUES
    ('Rosi Joy Participant', 'rosi@example.com', 'senha123', '123456789', 'linkedin.com/rosi', 'BASE64_IMAGE', 'INATEL', 'participant'),
    ('John Johnson Creator', 'john@example.com', 'senha456', '987654321', 'linkedin.com/john', 'BASE64_IMAGE', 'INTELBRAS', 'creator'),
    ('Carlos Administrator', 'carl@example.com', 'senha789', '456789123', 'linkedin.com/carl', 'BASE64_IMAGE', 'BINARY HORIZON', 'administrator');

INSERT INTO Event (title, description, picture, creatorId)
VALUES
    ('HackTown', 				'Evento em Santa Rita do Sapucaí.', 	'BASE64_IMAGE', 2),
    ('Festival de Linguiça', 	'Um festival de linguiça.', 			'BASE64_IMAGE', 2),
    ('Festival de Arte', 		'Um festival para celebrar a arte.', 	'BASE64_IMAGE', 2);

INSERT INTO Administrator (userId) VALUES (3);

