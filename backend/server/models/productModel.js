const {Pool} = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:arumuga@localhost/sharenest'
})

class ProductModel {
    async addProduct(productData) {
        const query = `INSERT INTO products (name, description, price, category, image, exact_location, isAvailable, user_id) VALUES ($1, $2, $3, $4, $5, ST_GeomFromEWKB(decode($6, 'hex')), $7, $8) RETURNING *;`;
    
    try {
        const { rows } = await pool.query(query, productData);
        return rows[0];
    } catch (error) {
        console.log("error occured while adding a product to the data base", error);
    }
    }

    async deleteProduct(productId) {
        const query = 'UPDATE products SET is_deleted = TRUE WHERE id = $1';
        try {
            console.log(productId);
            const {rows} = await pool.query(query, [productId]);
            console.log(rows);
        }
        catch(error) {
            console.log("error occured while deleting a product", error);
        }

    }

    async getProducts(userLocation, userId) {
        const query = `SELECT *, ST_Distance(ST_GeomFromEWKB(decode($1, 'hex')), product.exact_location) AS distance FROM products AS product WHERE $2!=product.user_id and isavailable = true and is_deleted = false ORDER BY distance LIMIT 15`
        try {
            const {rows} = await pool.query(query, [userLocation, userId]);
            console.log(rows)
            return rows;
        }
        catch(error) {
            console.log("error occured while fetching a product from table", error);
            throw error;
        }
    }

    async productDetails(productId) {
        try
        {
            const query = 'SELECT p.*, u.phone_no, u.village_town , u.district , u.state, u.full_name FROM products p JOIN users u ON p.user_id = u.user_id WHERE p.id=$1'
            const {rows} = await pool.query(query, [productId]);
            return rows[0];
        }
        catch(error) {
            console.log('error in product details', error);
        }
    }

    async myProducts(userId) {
        try {

            const query = "select * from products where user_id=$1 and is_deleted = FALSE";
            const {rows} = await pool.query(query, [userId]);
            console.log(rows)
            return rows;
        }
        catch(err) {
            console.log('error in my products in product model', err.message)
        }
    }

    async updateAvailability(productId) {
        try {
            const query = "UPDATE products SET isavailable = NOT isavailable WHERE id = $1";
            pool.query(query, [productId]);
        }
        catch(err) {
            console.log("error occurred in product model", err);
        }
    }

}

module.exports = new ProductModel();