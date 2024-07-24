const productModel = require('./../models/productModel');
const userModel = require('./../models/usersModel');
const paymentModel = require('./../models/paymentModel');
const orderModel = require('./../models/orderModel');
const mailController = require('./mailController');

const createPaymentSession = async(req,res) => {
    try {
        const apiKey = 'sk_test_51OtrxWSE7Pfvsbwumzn7PAfF0TMBip40hE8xp8wbiMpaYor00TWYIl4g1pO789SRfzHFXvTLMfdwIRE50UUSisdb00ZhoQGC9e';
        const user = await userModel.getUser(req.user);
        let {productId, startDate, endDate} = req.body;
        const noOfDays = dayDiff(startDate, endDate)
        const productDetails = await productModel.productDetails(productId);
        productDetails.price = parseFloat(productDetails.price) + (0.02 * parseFloat(productDetails.price));
        const unitAmount = parseInt(productDetails.price * 100 * noOfDays)
        const stripe =  require('stripe')(apiKey)
        const session = await stripe.checkout.sessions.create({ 
            payment_method_types: ["card"], 
            line_items: [ 
              { 
                price_data: { 
                  currency: "inr", 
                  product_data: { 
                    name: productDetails.name
                  }, 
                  unit_amount: unitAmount
                }, 
                quantity: 1,
              }, 
            ], 
            
            mode: "payment", 
            customer_email: user.email_id,
            metadata: {
                productId: productId,
                lendDate: startDate,
                returnDate: endDate,
                noOfDays: noOfDays
            },
            success_url: "http://localhost:3000/success", 
            cancel_url: "http://localhost:3000/cancel", 
          }); 
          res.json({ url: session.url });
    }
    catch(err) {
        console.log('error occured in create payment session in product controller', err)
    }
}

const webhook = async(request, response) => {
    const apiKey = 'sk_test_51OtrxWSE7Pfvsbwumzn7PAfF0TMBip40hE8xp8wbiMpaYor00TWYIl4g1pO789SRfzHFXvTLMfdwIRE50UUSisdb00ZhoQGC9e';
    const sig = request.headers['stripe-signature'];
    const endpointSecret = 'whsec_DT19Sf9d0JFc0TT9ygnd2TZsIgQln12i';
    const stripe =  require('stripe')(apiKey);
    console.log("called");
    console.log(request.body);
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log(err);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        const payment = [
            event.data.object.amount_total / 100,
            event.data.object.id,
            event.data.object.payment_status
        ]
        console.log(payment);
        const paymentId =  await paymentModel.createPayment(payment);
        console.log(paymentId);
        const metadata = event.data.object.metadata;
        const productDetails = await productModel.productDetails(metadata.productId);
        const buyerId = await userModel.getUserId(event.data.object.customer_email);
        const otp = Math.floor(Math.random() * 900000) + 100000;
        const orderInfo = [
            metadata.productId,
            buyerId,
            productDetails.user_id,
            metadata.lendDate,
            metadata.returnDate,
            productDetails.price * metadata.noOfDays,
            paymentId,
            otp
        ];
        console.log(orderInfo);
        const orderId = await orderModel.createOrder(orderInfo);
        mailController.orderConfirmationMailToRenter(orderId);
        mailController.orderConfirmationMailToLender(orderId);
        productModel.updateAvailability(metadata.productId);
    }
    response.send();
}

const dayDiff = (startDate, endDate) => {
    
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const differenceInMilliseconds = Math.abs(endDate - startDate);
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceInMilliseconds / millisecondsInOneDay) + 1;
}

module.exports = {
    createPaymentSession,
    webhook
}