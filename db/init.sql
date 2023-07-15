/* 
 * Description: SQL script to run when initializing database.
 */
-- DROP DATABASE IF EXISTS master;
-- CREATE DATABASE master;
USE master;

/* Table Creation */
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    user_id INT NOT NULL auto_increment,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT UC_User UNIQUE (username)
);

INSERT INTO
    User(username, password)
VALUES
    ("test_user", "good_password");


DROP TABLE IF EXISTS Sample;

CREATE TABLE Sample (
    sample_id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    genre VARCHAR(255) NULL,
    length INT NOT NULL,
    file_location VARCHAR(255) NOT NULL,
    PRIMARY KEY (sample_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

INSERT INTO Sample
(
    user_id,
    name,
    description,
    genre,
    length,
    file_location
)
VALUES
(
    1,
    "drum fill",
    "brushy, jazzy sounding drum kit fill",
    "jazz",
    8,
    "drum fill.mp3"
),
(
    1,
    "drum loop",
    "lo-fi inspired drum loop",
    "lo-fi hip hop",
    6,
    "drum loop.mp3"
),
(
    1,
    "guitar loop A",
    "dark-sounding solo guitar loop",
    "jazz hop",
    11,
    "guitar loop 1.mp3"
),
(
    1,
    "guitar loop B",
    "dark-sounding duet guitar loop",
    "jazz hop",
    21,
    "guitar loop 2.mp3"
),
(
    1,
    "piano loop",
    "full-bodied jazz chord progression on piano",
    "jazz hop",
    43,
    "piano loop.mp3"
),
(
    1,
    "radio vocals",
    "a few seconds of an old radio broadcast",
    "live sounds",
    6,
    "radio vocals.mp3"
),
(
    1,
    "vinyl beat",
    "warm and fuzzy vinyl lo-fi beat",
    "lo-fi hip hop",
    11,
    "vinyl beat.mp3"
),
(
    1,
    "vocal fill",
    "female scat vocal fill",
    "jazz",
    3,
    "vocal fill.mp3"
),
(
    1,
    "vocal harmonies",
    "jazz-inspired female vocal harmony loop",
    "jazz",
    21,
    "vocal harmonies.mp3"
),
(
    1,
    "vocal loop",
    "melodic male vocal loop",
    "jazz",
    21,
    "vocal loop.mp3"
),
(
    1,
    "meow",
    "feline vocals",
    "cat noises",
    11,
    "Meow.mp3"
);
