import { useEffect, useState } from 'react';
import styles from './../../../styles/home page/my order/myOrder.module.css';
import LoadingPage from '../../loading page/loadingPage';
import axios from 'axios';
import Cookies from 'js-cookie';
import EachOrder from './EachOrder';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState(null);
    const [rentSelected, setRentSelected] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get('http://localhost:5000/my-orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setMyOrders(response.data);
            console.log(response);
        })
        .catch((err) => console.log(err.message))
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                My orders
            </div>
            <div className={styles['choice-container']}>
                <div className={`${styles['option']} ${rentSelected && styles['selected-option']}`} onClick={() => setRentSelected(true)}>
                    rent
                </div>
                <div className={`${styles['option']} ${!rentSelected && styles['selected-option']}`} onClick={() => setRentSelected(false)}>
                    lend
                </div>
            </div>
            {
                myOrders 
                ?
                rentSelected
                    ?
                    myOrders.rented.map((orderDetails) => {
                        return <EachOrder orderDetails={orderDetails} rentSelected={rentSelected} />
                    })
                    : myOrders.lended.map((orderDetails) => {
                        return <EachOrder orderDetails={orderDetails} rentSelected={rentSelected}/>
                    })
                :<LoadingPage/>
            }
        </div>
    )
}

export default MyOrders;