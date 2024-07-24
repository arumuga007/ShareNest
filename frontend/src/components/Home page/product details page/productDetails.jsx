import { useEffect, useState } from 'react';
import LoadingPage from '../../loading page/loadingPage';
import styles from './../../../styles/home page/product details page/productDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShowProductDetail from './showProductDetail';

const ProductDetails = () => {

    const [productDetails, setProductDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/product-details/${id}`)
            .then(res => {
                console.log(res.data.productDetails);
                setProductDetail(res.data.productDetails);
            })
            .catch(err => console.log(err));
    }, [id]); 

    return (
        <div className={styles['container']}>
            {
                productDetails
                    ? <ShowProductDetail productDetails={productDetails}/>
                    : <LoadingPage />
            }
        </div>
    );
};

export default ProductDetails;
