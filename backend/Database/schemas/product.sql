CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(100),
    image TEXT,
    exact_location GEOGRAPHY(Point, 4326) NOT NULL,
    isAvailable BOOLEAN
);
