CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    email_id VARCHAR(100) NOT NULL UNIQUE,
    phone_no VARCHAR(20) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    country VARCHAR(30) NOT NULL,
    state VARCHAR(30) NOT NULL,
    district VARCHAR(30) NOT NULL,
    village_town VARCHAR(30) NOT NULL,
    door_no VARCHAR(10) NOT NULL,
    street VARCHAR(50) NOT NULL,
    exact_location Geography(Point, 4326) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE
);