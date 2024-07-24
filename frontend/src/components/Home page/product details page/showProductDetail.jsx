import { useEffect, useRef } from 'react';
import styles from './../../../styles/home page/product details page/productDetails.module.css';
import Cookies from 'js-cookie';


const createPaymentSession = (productId) => {
    console.log("product id",productId);
    fetch('http://locahost:5000/create-payment-session', {
        method:'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            productId: productId
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(err => console.log('error in create payment session'))
}

const ShowProductDetail = (props) => {
    console.log(props.productDetails.image.split('\\')[2]);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        console.log(today);
        startDateRef.current.value = today;
        endDateRef.current.min = today;
    }, [])

    const createPaymentSession = () => {
        const token = Cookies.get('token');
        fetch('http://localhost:5000/create-payment-session', {
            method:'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: props.productDetails.id,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            window.location.href= data.url
            console.log(data.url);
        })
        .catch(err => console.log('error in create payment session'))
    }
    
    return (
        <div className={styles['product-details-container']}>
            <div className={styles['image-container']}>
                <img src={`http://localhost:5000/public/Images/${props.productDetails.image.split('\\')[2]}`} />
            </div>
            <div className={styles['details-container']}>
                <div className={styles['product-title']}>
                    {props.productDetails.name}
                </div>
                <div className={styles['price-container']}>
                    ₹{props.productDetails.price}
                </div>
                <div className={styles['review-container']}>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>(20)
                </div>
                <div className={styles['product-description-container']}>
                    <div className={styles['description-title']}>Details:</div>
                    <div className={styles['product-description']}>
                    {props.productDetails.description}
                    </div>
                </div>
                <div className={styles['category-brand-container']}>
                    <div className={styles['product-category']}>
                        Category: <span>{props.productDetails.category}</span>
                    </div>
                </div>
                <div className={styles['user-info-container']}>
                    <div className={styles['user-title']}>
                        Seller Details:
                    </div>
                    <div className={styles['body-container']}>
            <div className={styles['location-container']}>
                <div className={styles['location-icon']}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-map-search"><path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5"></path><path d="M9 4v13"></path><path d="M15 7v5"></path><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M20.2 20.2l1.8 1.8"></path></svg>
                </div>
                <div className={styles['location-desc']}>
                    <div className={styles['location-header']}>
                        Location
                    </div>
                    <div className={styles['actual-location']}>
                        {props.productDetails.village_town}, {props.productDetails.district}
                    </div>
                </div>
            </div>
            <div className={styles['location-container']}>
                <div className={styles['location-icon']}>
                <svg fill="  #147efb" viewBox="0 0 32 32" height="32" width="32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="  #147efb"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>whatsapp</title> <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path> </g></svg>
                </div>
                <div className={styles['location-desc']}>
                    <div className={styles['location-header']}>
                        Whatsapp
                    </div>
                    <a target='_blank' className={styles['actual-location']} href='https://wa.me/+918838607697'>
                        +91 {props.productDetails.phone_no}
                    </a>
                </div>
            </div>
        </div>
                </div>
                <div className={styles['date-container']}>
                    <div className={styles['date-title']}>
                        Choose Date:
                    </div>
                    <div className={styles['select-date-container']}>
                    <div className={styles['start-date-container']}>
                        <div>start date:</div>
                        <input type='date' ref={startDateRef} disabled/>
                    </div>
                    <div className={styles['end-date-container']}>
                        <div>end date:</div>
                        <input type='date' ref={endDateRef} />
                    </div>
                    </div>
                </div>
                <div className={styles['rent-now-btn']} onClick={createPaymentSession}>
                    Rent now
                </div>
            </div>
        </div>
    )
}

export default ShowProductDetail;