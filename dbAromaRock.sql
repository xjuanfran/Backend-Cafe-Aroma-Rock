// SQL script to create tables for Aroma Rock restaurant database

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE menu (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (first_name, last_name, email, password, phone_number) VALUES
('Santiago ', 'Lloron', 'santiago.vega@example.com', 'hashed_password_123', '123-456-7890'),
('Valentina', 'Gomez', 'valentina.gomez@example.com', 'hashed_password_456', '098-765-4321');
INSERT INTO menu (name, description, price, category, image_url) VALUES
('Cappuccino', 'Un delicioso cappuccino con espuma de leche', 3.50, 'Bebidas', 'https://example.com/images/cappuccino.jpg'),
('Tarta de Chocolate', 'Tarta de chocolate rica y cremosa', 4.00, 'Postres', 'https://example.com/images/tarta_chocolate.jpg');
