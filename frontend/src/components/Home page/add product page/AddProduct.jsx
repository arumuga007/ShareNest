import styles from './../../../styles/home page/addproduct/addproduct.module.css';
import { addProduct } from '../../../Illustrations json/addProduct';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddProduct = () => {
        /* global bodymovin */
        const gifRef = useRef(null);
        useEffect(() => {
            var options = {
                container: gifRef.current,
                renderer: 'svg', 
                loop: true,
                autoplay: true,
                animationData: addProduct
            };
            var anim = bodymovin.loadAnimation(options);
        }, []);

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageName(file);
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    
const handleSubmit = (event) => {
    
    event.preventDefault();
    setSubmitted(true);
    const productDetails = new FormData();
    productDetails.append('file', imageName);
    productDetails.append('name', event.target.productName.value); 
    productDetails.append('description', event.target.description.value);
    productDetails.append('price', event.target.price.value);
    productDetails.append('category', event.target.category.value);
    console.log(productDetails);
    const token = Cookies.get('token');
    console.log(token);
    axios.post('http://localhost:5000/add-product', productDetails,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        setSubmitted(false);
        if(response.status >= 200 && response.status <= 300)
            return response;
        else
            throw new Error("something went wrong")
    })
    .then(data => {
        console.log('Upload successful:', data);
        navigate('/my-products');
    })
    .catch(error => {
        console.error('There was a problem with the upload:', error);
        navigate('/login')
        
    });
    };

    return (
        <div className={styles['outer-container']}>
        <div className={styles['container']}>
            <div className={styles['product-animation']} ref={gifRef}>

            </div>
            <div className={styles['product-container']}>
            <div className={styles['title']}>Product Information</div>
            <form className={styles['product-info-container']} onSubmit={(event) => handleSubmit(event)}>
                <div className={styles['product-name-container']}>
                    <div className={styles['product-label']}>
                        Product Name
                    </div>
                    <input type='text' required className={styles['product-input']} name='productName'/>
                </div>
                <div className={styles['product-name-container']}>
                    <div className={styles['product-label']}>
                        Description
                    </div>
                    <textarea className={styles['product-description']} name='description'></textarea>
                </div>
                <div className={styles['price-deposit-container']}>
                <div className={styles['product-name-container']}>
                    <div className={styles['product-label']}>
                        rental charge per day
                    </div>
                    <input type='text' required className={styles['product-input']} name='price'/>
                </div>
                <div className={styles['product-name-container']}>
                    <div className={styles['product-label']}>
                        Category
                    </div>
                    <input type='text' required className={styles['product-input']} name='category' placeholder='eg: mobile phone, vehicle etc'/>
                </div>
                </div>
                <div className={styles['product-name-container']}>
                    <div className={styles['product-label']}>
                        Product Image
                    </div>
                    <div className={styles['custom-upload-btn']}>
                    <svg width="30px" height="30px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-jB92v" d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path></svg>
                    Add photo
                        <input type='file' required className={styles['image-input']} onChange={handleImageChange} name='image'/>
                    <div className={`${styles['image-container']} ${image && styles['show-image']}`}>
                        <img src={image} />
                    </div>
                    </div>
                </div>
                <div className={styles['btn-container']}>
                    <div className={styles['cancel-btn']}>
                        cancel
                    </div>
                    <button type='submit' className={`${styles['next-button']} ${submitted && styles['disable-btn']}`} disabled={submitted} >
                        <span>submit</span>
                        <p></p>
                    </button>
                </div>
            </form>
            </div>
            
        </div>
        </div>
    )
}


export default AddProduct;