import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './.././../../styles/signIn page/signInDetails.module.css';

const VerifyDetails = () => {

    const emailSpanRef = useRef(null);
    const passwordSpanRef = useRef(null);
    const AadharNo = useRef(null);
    const phoneNo = useRef(null);
    const otp = useRef(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const verifyAadhar = () => {
    const url = 'https://verify-aadhaar-mobile-email-link.p.rapidapi.com/Uidverifywebsvcv1/VerifyEmailMobilelink';
    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'd92540368emshd095ea53a9a4ad0p16931fjsn1572d4bc284b',
		'X-RapidAPI-Host': 'verify-aadhaar-mobile-email-link.p.rapidapi.com'
	},
	body: new URLSearchParams({
		clientid: '222',
		uidnumber: AadharNo.current.value,
		consent: 'Y',
		txn_id: '3ed268c4-e8b8-11ec-8fea-0242ac120002',
		method: 'emailnmobilev2',
        mobileNumber: phoneNo.current.value
	})
    };
    fetch(url, options)
    .then(res => res.json())
    .then((data) => {

        if(data.Succeeded?.Uid_Details?.responseData?.code != "2006") {
            setMessage("invalid data");
            return;
        }
        setMessage("otp sent successfully");
        sendOtp();
    })
    .catch((err) => {
        console.log(err);
    })
    }

    const sendOtp = () => {
        const url = "http://localhost:5000/send-otp";
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: "91",
                phoneNumber: phoneNo.current.value
            })
        }
        console.log(options);
        fetch(url, options)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
    }

    const verifyOtp = () => {
        const url = 'http://localhost:5000/verify-otp';
        const token = Cookies.get('token');
        const options = {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                countryCode: "91",
                phoneNumber: phoneNo.current.value,
                otp: otp.current.value,
                aadharNo: AadharNo.current.value
            })
        };
        fetch(url, options)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <div className={styles['container']}>
            <div className={styles['logo-header-container']}>
                <div className={styles['logo-container']}>
                    <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" /> {/* Use %PUBLIC_URL% */}
                </div>
            </div>
            <div className={styles['input-container']}>
                <div className={styles['input-header']}>
                    Verify your Aadhar
                </div>
                {   message != "" &&
                    <div className={styles['invalid-msg']}>{message}</div>}
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>Aadhar no: <span ref={emailSpanRef}>*</span></div>
                    <input type='number' onChange={(event) => {
                        setMessage("");
                        let email = event.target.value

                        if (email.length == 12)
                            emailSpanRef.current.style.color = 'green';
                        else
                        emailSpanRef.current.style.color = 'red';
                    }} ref={AadharNo} maxLength={12} minLength={12}/>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>Phone no linked with aadhar <span ref={passwordSpanRef}>*</span></div>
                    <input type='number' onChange={(event) => {
                        setMessage("");
                        let phoneNumber = event.target.value
                        if (phoneNumber.length == 10)
                            passwordSpanRef.current.style.color = 'green';
                        else
                            passwordSpanRef.current.style.color = 'red';
                    }} ref={phoneNo}
                    maxLength={10}
                    />
                    <div className={styles['send-otp-btn']} onClick={verifyAadhar}>send otp</div>
                </div>
                <div className={styles['verify-otp-container']}>
                    <input type='number' placeholder='Enter otp' ref={otp}/>
                    <div className={styles['verify-btn']} onClick={verifyOtp}>
                        verify otp
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyDetails;