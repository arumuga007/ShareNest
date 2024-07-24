const {Pool} = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:arumuga@localhost/sharenest'
})

class OrderModel {
    async createOrder(orderInfo) {
        try {
            const query = "INSERT INTO orders values(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, DEFAULT, DEFAULT) RETURNING id";
            const {rows} = await pool.query(query, orderInfo);
            console.log(rows[0]);
            return rows[0].id;
        }
        catch(err) {
            console.log("error occured in order model", err);
        }
    }

    async getOrderDetails(orderId) {
        try {
            const query = "SELECT * FROM orders WHERE id = $1";
            const {rows} = await pool.query(query, [orderId]);
            return rows[0];
        }
        catch(err) {
            console.log('error occured in order model', err);
        }
    }

    async getRentedItems(userId) {
        try {
            const query = "SELECT p.image, p.name, p.category, u.full_name, u.phone_no,u.door_no, u.street, u.village_town, u.district, pay.amount_paid as amount, o.lend_date, o.return_date, o.lender_otp, o.order_status, o.did_lender_received FROM orders o JOIN products p ON o.product_id = p.id JOIN users u ON o.seller_id = u.user_id JOIN payments pay ON o.payment_id = pay.id WHERE o.buyer_id = $1";
            const {rows} = await pool.query(query, [userId]);
            return rows;
        }
        catch(error) {
            console.log("error in order model", error);
        }
    }

    async getLendedItems(userId) {
        try {
            const query = "SELECT p.image, p.name, p.category, u.full_name, u.phone_no,u.door_no, u.street, u.village_town, u.district, o.amount, o.lend_date, o.return_date, o.id as orderId, o.order_status, o.did_lender_received FROM orders o JOIN products p ON o.product_id = p.id JOIN users u ON o.buyer_id = u.user_id WHERE o.seller_id = $1";
            const {rows} = await pool.query(query, [userId]);
            return rows;
        }
        catch(error) {
            console.log("error in order model", error);
        }
    }

    async verifyOTP(otp, orderId) {
        try {
            console.log(orderId);
            const query = "UPDATE orders SET order_status = 'Rental in Progress' WHERE id = $1 AND lender_otp = $2";
            const {rowCount} = await pool.query(query, [orderId, otp]);
            return Boolean(rowCount);
        }
        catch(error) {
            console.log("error occured in order model", error);
        }
    }

    async updateOrderStatus() {
        try {
            const date = new Date('2024-04-12');
            let currentDate = date.toISOString().split('T')[0];
            console.log(currentDate);
            const orderQuery = "UPDATE orders SET order_status = 'item returned' where return_date::date = $1 returning product_id";
            const {rows} = await pool.query(orderQuery, [currentDate]);
            rows.forEach(async(value) => {
                const query = 'UPDATE products SET isavailable = true WHERE id = $1';
                await pool.query(query, [value.product_id]);
            })
            console.log(rows);
        }
        catch(error) {
            console.log("error occured in update order status", error);
        }
    }

    async allOrders() {
        try {
            const query = 'select o.id, o.did_lender_received, o.amount, u.account_no, u.ifsc_code from orders o join users u on o.seller_id = u.user_id';
            const {rows} = await pool.query(query);
            console.log(rows);
            return rows;
        }
        catch(error) {
            console.log(error);
        }
    }

    async paymentDone(orderId) {
        try {
            const query = 'UPDATE orders SET did_lender_received = true WHERE id = $1';
            await pool.query(query, [orderId]);
        }
        catch(error) {
            console.log(error);
        }
    }
}

module.exports = new OrderModel();