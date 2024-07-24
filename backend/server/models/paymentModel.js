const {Pool} = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:arumuga@localhost/sharenest'
})

class PaymentModel {
    async createPayment(payment) {
        try {
            const query = "INSERT INTO payments values(DEFAULT, $1, $2, $3) RETURNING id";
            const {rows} = await pool.query(query, payment);
            return rows[0].id;
        }
        catch(err) {
            console.log('Error in payment model', err);
        }
    }
}

module.exports = new PaymentModel();