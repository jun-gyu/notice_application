CREATE DATABASE
IF NOT EXISTS notice;

CREATE TABLE
IF NOT EXISTS users
(
    users_id int NOT NULL AUTO_INCREMENT,
    name varchar
(45) NOT NULL,
    email varchar
(45) NOT NULL,
    password varchar
(45) NOT NULL,
    primary key
(users_id)
);
DESC users;

CREATE TABLE
IF NOT EXISTS notice
(
    notice_id int NOT NULL AUTO_INCREMENT,
    title varchar
(255) NOT NULL,
    content text NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    primary key
(notice)
);
DESC notice;