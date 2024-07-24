CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    buyer_id INT REFERENCES users(user_id),
    seller_id INT REFERENCES users(user_id),
    lend_date DATE,
    return_date DATE,
    amount NUMERIC(10,2),
    payment_id INT REFERENCES payments(id),
    lender_otp INT,
    order_status VARCHAR(20),
    did_lender_received BOOLEAN
);