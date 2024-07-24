import { useRef, useState } from 'react';
import styles from './../../../styles/home page/my order/eachOrder.module.css';

const showOtp = (otp) => {
    return (
        <>
            <div>OTP: <span>{otp}</span></div>
            <div>Tell this pin to the lender to get the item</div>
        </>
    )
}


const EachOrder = (props) => {
    const [showEnterOtp, setShowEnterOtp] = useState(false);
    const otpRef = useRef(null);
    const [isValidOtp, setIsValidOtp] = useState(false);
    const otpField = () => {
        return(
            <>
                <div>Please enter the OTP provided by the renter</div>
                <div className={styles['otp-field-container']}>
                    <div className={styles['input-container']}>
                    <input type='text'placeholder='eg: 770850'ref={otpRef} className={`${isValidOtp && styles['invalid-input']}`} onChange={(isValidOtp) => setIsValidOtp(false)} />
                    {isValidOtp && <span>invalid otp</span>}
                    </div>
                    <div className={styles['submit-otp']} onClick={submitOtp}>submit</div>
                </div>
            </>
        )
    }
    const submitOtp = () => {
        const otp = otpRef.current.value;
        if(isNaN(otp) || otp.length != 6)
            return;
            const url = 'http://localhost:5000/verify-order-otp';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    otp : otp,
                    orderId: props.orderDetails.orderid
                })
            }
            fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if(!data.isValidOtp)
                    setIsValidOtp(true);
                else
                    window.location.reload();
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={styles['container']}>
            <div className={styles['image-container']}>
            <img src={`http://localhost:5000/public/Images/${props.orderDetails.image.split('\\')[2]}`} />
            </div>
            <div className={styles['otp-details-container']}>
                <div className={styles['details-container']}>
                    <div className={styles['product-details-container']}>
                        <div className={styles['product-name-category']}>
                            <div className={styles['product-name']}>
                                {props.orderDetails.name}
                            </div>
                            <div className={styles['product-category']}>
                                {props.orderDetails.category}
                            </div>
                        </div>
                        <div className={styles['time-details-container']}>
                            <div className={styles['from-container']}>
                                From: <span>{props.orderDetails.lend_date.split('T')[0]}</span>
                            </div>
                            <div className={styles['from-container']}>
                                To: <span>{props.orderDetails.return_date.split('T')[0]}</span>
                            </div>
                            <div className={styles['from-container']}>
                                Amount: <span>{props.orderDetails.amount}</span>
                            </div>
                            <div className={styles['from-container']}>
                                status: <span>{props.orderDetails.order_status}</span>
                            </div>
                            {
                                !props.rentSelected && <div className={styles['from-container']}>
                                payment status: <span>{props.orderDetails.did_lender_received ? "transferred" : "pending"}</span>
                            </div>}
                        </div>
                    </div>
                    <div className={styles['renter-lender-container']}>
                        <div className={styles['details-header']}>
                            {
                                props.rentSelected
                                ? "Seller Details:"
                                : "Buyer Details"
                            }
                        </div>
                        <div className={styles['user-details-container']}>
                            <div><i class="fa fa-user" aria-hidden="true"></i> {props.orderDetails.full_name}</div>
                            <div><i class="fa fa-phone" aria-hidden="true"></i> {props.orderDetails.phone_no}</div>
                            <div><i class="fa-solid fa-location-dot"></i> {props.orderDetails.door_no}, {props.orderDetails.street}, {props.orderDetails.village_town} </div>
                        </div>
                        {
                            props.orderDetails.order_status == "Awaiting Pickup" &&
                            <div className={styles['otp-btn']} onClick={() => setShowEnterOtp(!showEnterOtp)}>
                                {
                                    props.rentSelected 
                                    ? "show otp" 
                                    : "enter otp"
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className={`${styles['otp-container']} ${showEnterOtp && styles['show-otp-container']}`}>
                    {
                        props.rentSelected
                        ? showOtp(props.orderDetails.lender_otp)
                        : otpField()
                    }
                </div>
            </div>
        </div>
    )
};

export default EachOrder;