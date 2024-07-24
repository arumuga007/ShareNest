const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cookie = require('cookie-parser')
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const dailyScriptController = require('./controllers/dailyScriptController');
const paymentController = require('./controllers/paymentController');
const otpController = require('./controllers/sendOtp');
const orderController = require('./controllers/orderController');
const cookieParser = require('cookie-parser');
const {identifyUser} = require('./auth/jwt');
require('dotenv').config();

dailyScriptController.schedule();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.post('/webhook', express.raw({type: 'application/json'}), paymentController.webhook);
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

app.get('/check', () => {
    console.log('checked');
})

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
    cb(null, file.fieldname + + Date.now() + path.extname (file.originalname))
    }
})

const upload = multer({
    storage: storage
})
app.post("/create-user", userController.createUser)
app.post("/login-user", userController.loginUser)
app.post('/add-product', [identifyUser, upload.single('file') ], productController.addProduct);
app.get('/get-product', identifyUser, productController.getProduct);
app.get('/product-details/:id', productController.productDetail);
app.post('/create-payment-session',identifyUser, paymentController.createPaymentSession);
app.get('/my-products',identifyUser, productController.myProducts);
app.post('/send-otp', otpController.sendOTP);
app.post('/verify-otp',identifyUser, otpController.verifyOTP);
app.get('/my-orders', identifyUser, orderController.getMyOrders);
app.post('/verify-order-otp',orderController.verifyOTP);
app.get('/all-orders',orderController.allOrders);
app.post('/payment-done',orderController.paymentDone);
app.post('/delete-product',identifyUser, productController.deleteProduct);

app.listen(5000, () => {
    console.log("The server has been started on port 5000");
})