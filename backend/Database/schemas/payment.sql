CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    amount_paid NUMERIC(10,2),
    payment_id VARCHAR(78),
    payment_status VARCHAR(10),
)