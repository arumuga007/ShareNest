const { generateToken } = require('../auth/jwt');
const userModel = require('./../models/usersModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const userInfo = req.body.userInfo;
    console.log(userInfo.length)

    try {
        const userId = await userModel.createUser(userInfo);
        const userToken = generateToken({userId: userId});
        console.log(userToken);
        res.status(200).json(userToken);
    }
    catch(error) {
        console.log('error occured in user controller while creating a new user in user controller', error);
    }
}

const loginUser = async (req, res) => {
    const userDetail = req.body.userDetail;
    console.log(userDetail.length)

    try {
        const user = await userModel.loginUser(userDetail);
        console.log("user", user);

        if (!user) {
            throw new Error("Invalid login credentials");
        }

        const passwordMatch = await bcrypt.compare(userDetail[1], user.password_hash);
        if (user.email_id === userDetail[0] && passwordMatch) {
            console.log('Correct userDetail');
            const userToken = generateToken({userId: user.user_id});
            console.log(userToken);
            res.status(200).json(userToken);
        } else {
            throw new Error("Invalid login credentials");
        }
    }
    catch(error) {
        console.log('Error occurred in user controller while logging in:', error);
        return res.status(400).json("Invalid login credentials");
    }
}


module.exports = {
    createUser, loginUser
};