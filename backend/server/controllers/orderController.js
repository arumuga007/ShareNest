const orderModel = require('./../models/orderModel');

const getMyOrders = async(req, res) => {
    const userId = req.user;
    const myOrders = {};
    myOrders.rented = await orderModel.getRentedItems(userId);
    myOrders.lended = await orderModel.getLendedItems(userId);
    console.log(myOrders);
    return res.status(200).json(myOrders);
}


const verifyOTP = async(req, res) => {
    const {otp, orderId} = req.body;
    const isValidOtp = await orderModel.verifyOTP(otp, orderId);
    console.log(isValidOtp);
    return res.status(200).json({isValidOtp});
}

const allOrders = async(req, res) => {
    console.log("called");
    const orders = await orderModel.allOrders();
    return res.status(200).json(orders);
}

const paymentDone = async(req, res) => {
    console.log("called");
    await orderModel.paymentDone(req.body.orderId);
    return res.status(200).json({message: 'payment updated'})
}

module.exports = {
    getMyOrders,
    verifyOTP,
    allOrders,
    paymentDone
}