const nodemailer = require('nodemailer');
const productModel = require('./../models/productModel');
const userModel = require('./../models/usersModel');
const paymentModel = require('./../models/paymentModel');
const orderModel = require('./../models/orderModel');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sharenestrental@gmail.com",
      pass: "slrzjqurekvuohqy ",
    },
  });

const orderConfirmationMailToRenter = async(orderId) => {
  console.log("called")
  const orderDetails = await orderModel.getOrderDetails(orderId);
  console.log(orderDetails);
  const productDetails = await productModel.productDetails(orderDetails.product_id);
  const buyerDetails = await userModel.getUser(orderDetails.buyer_id);
  const sellerDetails = await userModel.getUser(orderDetails.seller_id);
  const startDate = new Date(orderDetails.lend_date);
  const endDate = new Date(orderDetails.return_date);
  const rentalPeriod = `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;

console.log(rentalPeriod); 
  console.log(sellerDetails);
  let mailOptions = {
    from: 'sharenestrental@gmail.com',
    to: buyerDetails.email_id,
    subject: `Rental Confirmation ${productDetails.name}`,
    html: `
    <h3>Dear ${buyerDetails.full_name},</h3>
    <p>Thank you for choosing a ShareNest to rent an item. Your trust in us is greatly appreciated.</p>
    <div style="width: 100vw;display:flex; justify-content:center">
      <img src="https://drive.usercontent.google.com/download?id=1N8vEEty6HZ01L1QwS0pw9G9chAh5v42N" alt="Image" width="300" height="200">
    </div>
    <p>Below, you'll find the details of your recent rental:</p>
    <ul>
        <li>Item: <strong>${productDetails.name}</strong></li>
        <li>Lender: <strong>${sellerDetails.full_name}</strong></li>
        <li>Contact No. of Lender: <strong>${sellerDetails.phone_no}</strong></li>
        <li>Location for Pick-up/Drop-off: <strong>${sellerDetails.door_no}, ${sellerDetails.street}, ${sellerDetails.village_town}, ${sellerDetails.district}
        </strong></li>
        <li>Rental Period: <strong>${rentalPeriod}</strong></li>
    </ul>
    <p>Please make sure to coordinate with the lender regarding the pick-up and drop-off details as well as any other arrangements necessary for the smooth completion of your rental.</p>
    <p>We strive to provide the best service possible, and your satisfaction is our top priority. If you have any questions or concerns, please feel free to reach out to us at <strong>sharenestrental@gmail.com</strong>.</p>
    <h3>Best regards,</h3>
    <h4>Sharenest</h4>
    `
  };
  sendMail(mailOptions)
}

const orderConfirmationMailToLender = async(orderId) => {
  const orderDetails = await orderModel.getOrderDetails(orderId);
  const productDetails = await productModel.productDetails(orderDetails.product_id);
  const buyerDetails = await userModel.getUser(orderDetails.buyer_id);
  const sellerDetails = await userModel.getUser(orderDetails.seller_id);
  const startDate = new Date(orderDetails.lend_date);
  const endDate = new Date(orderDetails.return_date);
  const rentalPeriod = `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
  let mailOptions = {
    from: 'sharenestrental@gmail.com',
    to: sellerDetails.email_id,
    subject: `Rental Confirmation: Your ${productDetails.name} has been rented out`,
    html: `
    <h3>Dear ${sellerDetails.full_name},</h3>
    <p>We would like to inform you that your item has been rented out through sharenest.</p>
    <div style="width: 100vw;display:flex; justify-content:center">
      <img src="https://drive.usercontent.google.com/download?id=1N8vEEty6HZ01L1QwS0pw9G9chAh5v42N" alt="Image" width="300" height="200">
    </div>
    <p>Below, you'll find the details of the rental:</p>
    <ul>
        <li>Item: <strong>${productDetails.name}</strong></li>
        <li>Renter: <strong>${buyerDetails.full_name}</strong></li>
        <li>Contact No. of Renter: <strong>${buyerDetails.phone_no}</strong></li>
        </strong></li>
        <li>Rental Period: <strong>${rentalPeriod}</strong></li>
    </ul>
    <p>Amount <strong>₹${orderDetails.amount}</strong> will be transferred after the seller receives the item.</p>
    <p>Please make sure to coordinate with the renter regarding the pick-up and drop-off details as well as any other arrangements necessary for the smooth completion of your rental.</p>
    <p>We strive to provide the best service possible, and your satisfaction is our top priority. If you have any questions or concerns, please feel free to reach out to us at <strong>sharenestrental@gmail.com</strong>.</p>
    <h3>Best regards,</h3>
    <h4>Sharenest</h4>
    `
  };
  sendMail(mailOptions)
}

  

const sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}



module.exports = {
    orderConfirmationMailToRenter,
    orderConfirmationMailToLender
};