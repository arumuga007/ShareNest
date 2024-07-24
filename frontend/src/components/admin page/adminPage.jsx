import { useEffect, useState } from 'react';
import styles from './../../styles/admin page/adminPage.module.css';
import LoadingPage from '../loading page/loadingPage';
import axios from 'axios';

const AdminPage = () => {

    const [allOrders, setallOrders] = useState(null);
    const [pendingSelected, setpendingSelected] = useState(true);

    const paymentDone = (orderId) => {
        const url = 'http://localhost:5000/payment-done';
        const options = {
            method: 'POST',
            headers : {
                'content-type': 'application/json'
            },
            body: JSON.stringify({orderId: orderId})
        }
        fetch(url, options)
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:5000/all-orders')
        .then((response) => {
            setallOrders(response.data);
            console.log(response);
        })
        .catch((err) => console.log(err.message))
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                Orders
            </div>
            <div className={styles['choice-container']}>
                <div className={`${styles['option']} ${pendingSelected && styles['selected-option']}`} onClick={() => setpendingSelected(true)}>
                    pending
                </div>
                <div className={`${styles['option']} ${!pendingSelected && styles['selected-option']}`} onClick={() => setpendingSelected(false)}>
                    paid
                </div>
            </div>
            <div className={styles['orders-container']}>
                <div className={styles['order-header']}>
                    <div className={styles['order-id']}>order id</div>
                    <div className={styles['account-no']}>account no</div>
                    <div className={styles['ifsc-code']}>ifsc code</div>
                    <div className={styles['amount']}>amount</div>
                    <div className={styles['payment-header']}>payment</div>
                </div>
            {
                
                allOrders 
                ?
                allOrders.map((orderDetails) => {
                    if(pendingSelected && !orderDetails.did_lender_received) {

                    return (<div className={styles['order-header']}>
                    <div className={styles['order-id']}>{orderDetails.id}</div>
                    <div className={styles['account-no']}>{orderDetails.account_no}</div>
                    <div className={styles['ifsc-code']}>{orderDetails.ifsc_code}</div>
                    <div className={styles['amount']}>{orderDetails.amount}</div>
                    <div className={styles['payment']} onClick={() => {
                        paymentDone(orderDetails.id);
                    }}>pay</div>
                </div>
                        )
                    }
                    else if(!pendingSelected && orderDetails.did_lender_received){
                        return (
                            <div className={styles['order-header']}>
                    <div className={styles['order-id']}>{orderDetails.id}</div>
                    <div className={styles['account-no']}>{orderDetails.account_no}</div>
                    <div className={styles['ifsc-code']}>{orderDetails.ifsc_code}</div>
                    <div className={styles['amount']}>{orderDetails.amount}</div>
                    <div className={styles['paid']}>paid</div>
                        </div>
                        )
                    }
                })
                :<LoadingPage/>
            }
        </div>
        </div>
    )
}

export default AdminPage;