import { useEffect, useState } from 'react';
import styles from './../../../styles/home page/my products/myproducts.module.css';
import LoadingPage from '../../loading page/loadingPage';
import EachProducts from './eachProducts';
import axios from 'axios';
import Cookies from 'js-cookie';

const Myproducts = () => {

    const [myProducts, setMyProducts] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get('http://localhost:5000/my-products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setMyProducts(response.data.products);
            console.log(myProducts)
        })
        .catch((err) => console.log(err.message))
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                My products
            </div>
            {
                myProducts 
                ? myProducts.map((product) => {
                    return <EachProducts product={product}/>
                })
                :<LoadingPage/>
            }
        </div>
    )
}

export default Myproducts;