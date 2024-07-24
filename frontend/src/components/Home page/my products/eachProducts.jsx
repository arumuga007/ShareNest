import styles from './../../../styles/home page/my products/myproducts.module.css';
import Cookies from 'js-cookie';

const EachProducts = (props) => {
    const deleteItem = () => {
        const productId = props.product.id;
        const bodyData = {
            productId: productId
        }
        console.log(bodyData);
        const token = Cookies.get('token');
        console.log(productId);
        const url = 'http://localhost:5000/delete-product';

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
            window.location.reload();
        })
        .catch((err) => console.log(err))

    }
    return (
        <div className={styles['single-product-container']}>
            <div className={styles['image-container']}>
                <img src={`http://localhost:5000/public/Images/${props.product.image.split('\\')[2]}`} />
            </div>
            <div className={styles['details-container']}>
                <div className={styles['title-price-container']}>
                    <div className={styles['title']}>
                        {props.product.name}
                    </div>
                    <div className={styles['price-container']}>
                        <div className={styles['price']}>
                            ₹{props.product.price}
                        </div>
                    </div>
                </div>
                <div className={styles['category-brands-container']}>
                    <div className={styles['categories']}>
                        <div>category:</div>
                        <span>{props.product.category}</span>
                    </div>
                </div>
                <div className={styles['remove-btn-container']} onClick={deleteItem}>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default EachProducts;