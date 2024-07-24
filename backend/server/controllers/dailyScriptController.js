const cron = require('node-cron');
const orderModel = require('./../models/orderModel');

const updateOrdersDetail = async() => {
    await orderModel.updateOrderStatus();
}
const schedule = () => {
cron.schedule('59 23 * * *', updateOrdersDetail);
}
module.exports = {
    schedule
}