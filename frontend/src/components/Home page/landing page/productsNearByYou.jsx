import { useEffect, useState } from 'react';
import styles from './../../../styles/home page/landing page/productsNearByYou.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProductsNearByYou = () => {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get('http://localhost:5000/get-product', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.status >= 200 && response.status <= 300) {
                setProducts(response.data.products);
            } else {
                throw new Error("Something went wrong");
            }
        })
        .catch(error => {
            console.error('There was a problem with the upload:', error);
            navigate('/login')
        });
    }, []);

    return (
        <div className={styles['container']}>
            <div className={styles['header-text']}>
                Products Near By You
            </div>
            
            <div className={styles['feature-container']}>
                {products && products.map((value,index) => (
                    <Link key={index} className={styles['each-product']} to={`/product-detail/${value.id}`}>
                        <div className={styles['image-container']}>
                            <img src={`http://localhost:5000/public/Images/${value.image.split('\\')[2]}`} alt={value.name} />
                        </div>
                        <div className={styles['product-details']}>
                            <div className={styles['product-title']}>{value.name}</div>
                            <div className={styles['review-container']}>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                            </div>
                            <div className={styles['price-day-container']}>
                                <div className={styles['price-container']}>₹{value.price}</div>
                                <div className={styles['day']}>per day</div>
                            </div>
                        </div>  
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductsNearByYou;
