
create database if not exists PositiveThoughts;

use PositiveThoughts;

CREATE TABLE IF NOT EXISTS users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(60) NOT NULL,
    Email VARCHAR(100) UNIQUE
);
