const {Pool} = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    connectionString: 'postgresql://postgres:arumuga@localhost/sharenest'
})

class UserModel {
    async createUser(userData) {
        try {
        console.log('create user called');
        userData[1] = await bcrypt.hash(userData[1], 10);
        console.log(userData);
        const query = 'INSERT INTO users VALUES(DEFAULT, $1, $3, $4, $2, $7, $8, $9, $10, $11, $12, ST_SetSRID(ST_MakePoint($13, $14), 4326), DEFAULT, NULL, DEFAULT, $5, $6) returning user_id';
        const {rows} =  await pool.query(query, userData);
        console.log('user created successfuly');
        return rows[0];
        }
        catch(err) {
            console.log(err);
        }
    }

    async loginUser(userData) {
        try {
            const query = 'SELECT * FROM users WHERE email_id = $1 LIMIT 1';
            const { rows } = await pool.query(query, [userData[0]]);
            console.log("User identified successfully");
            return rows[0];
        } catch (err) {
            console.log('Error occurred while logging in as a user', err);
            return null;
        }
    }

    async getUser(userId) {
        try {
            const query =   'SELECT * FROM users WHERE user_id = $1 LIMIT 1';
            const {rows} = await pool.query(query, [userId]);
            return rows[0];
        }
        catch(error) {
            console.log("error occured while identifying a user", error);
        }
    }
    
    async verifyUser(userId, aadharNo) {
        try {
            const query = "UPDATE users SET aadhar_no = $1, is_verified = TRUE WHERE user_id = $2";
            const {rows} = await pool.query(query, [aadharNo, userId]);
            console.log(rows);
        }
        catch(error) {
            console.log("error occured in verified user", error);
        }
    }

    async getUserId(userEmail) {
        try {
            const query = "SELECT user_id FROM users WHERE email_id = $1";
            const {rows} = await pool.query(query, [userEmail]);
            return rows[0].user_id;
        }
        catch(err) {
            console.log("error in user model", err);
        }
    }

}

module.exports = new UserModel();
