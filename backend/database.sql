CREATE DATABASE noteapp;
--users table
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
--note table
CREATE TABLE note(
    note_id SERIAL,
    user_id UUID,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    timestamp timestamp default current_timestamp,
    PRIMARY KEY (note_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);