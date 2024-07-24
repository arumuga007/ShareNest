const userModel = require('./../models/usersModel');

ACCESS_SECRET_KEY = '74533ccf90b1ca0f5782a7f770a02f6dca92266ad41b3948a038ddcc467d5f4fd368eb7ea3b944dbd3c6444b2d9ea9aecf2eda51f0ba9283c7ba50b9562f7917'
TWILIO_ACCOUNT_SID = "AC7a6c268e277dd0743a99e8eb199de7e8"
TWILIO_AUTH_TOKEN = "596c54489720385b0dc7e67697a1bdd4"
TWILIO_SERVICE_SID = "VAcc184f1329bd6a410aa2c5858ef80ce9"
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendOTP = async(req, res) => {
    console.log(req.body);
    const {countryCode, phoneNumber} = req.body;
    console.log(phoneNumber, countryCode);
    try {
        const otpResponse = await client.verify.v2
        .services(TWILIO_SERVICE_SID)
        .verifications.create({
            to: `+${countryCode}${phoneNumber}`,
            channel: "sms"
        })
        res.status(200).json(otpResponse);
    }
    catch(error) {
        console.log(error);
        res.status(error?.status || 400).send('something went wrong');
    }
}

const verifyOTP = async(req, res) => {
    const {aadharNo, countryCode, phoneNumber, otp} = req.body;
    const userId = req.user;
    try {
        const verifiedResponse = await client.verify.v2.services(TWILIO_SERVICE_SID)
            .verificationChecks.create({
                to: `+${countryCode}${phoneNumber}`,
                code: otp,
            })
        const {valid} = verifiedResponse;
        if(valid) {
            userModel.verifyUser(userId, aadharNo);
        }
        res.status(200).json(verifiedResponse);
    }
    catch(error) {
        console.log(error);
        res.status(error.status || 400).json(error);
    }
}


module.exports = {
    sendOTP, verifyOTP
}