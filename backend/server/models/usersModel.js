const {Pool} = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    connectionString: 'postgresql://postgres:arumuga@localhost/sharenest'
})

class UserModel {
    async createUser(userData) {
        try {
        console.log('create user called');
        userData[4] = await bcrypt.hash(userData[4], 10);
        console.log(userData)
        const query = 'INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, ST_SetSRID(ST_MakePoint($12, $13), 4326), $14) returning user_id';
        const {rows} =  await pool.query(query, userData);
        console.log('user created successfuly');
        return rows[0];
        }
        catch(err) {
            console.log(err);
        }
    }
}

module.exports = new UserModel();