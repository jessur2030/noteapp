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
CREATE TABLE notes(
    note_id SERIAL,
    user_id UUID,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    favorites BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (note_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- created_at TIMESTAMP,
-- test user
insert into users (user_name, user_email, user_password)
values ('Jesus', 'jesus@gmail.com', '123456');
-- test note
insert into notes (user_id, title, content)
values (
        '0c476467-0733-4b09-b7ce-8d012e8e8b88',
        'JS technical interview',
        'Study for upcoming technical interview. Tools and skills necessary for the role'
    );