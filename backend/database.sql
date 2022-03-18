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
    content TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (note_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- timestamp timestamp default current_timestamp,
-- test user
insert into users (user_name, user_email, user_password)
values ('Jesus', 'jesus@gmail.com', '123456');