import { Link } from 'react-router-dom';
import styles from './../../styles/navbar/iconLocation.module.css';

const IconLocation = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['icon-container']}>
                <Link className={styles['single-navicon-container']} style={{color: 'black'}} to={'/home'}>
                    <i class="fa-solid fa-house-chimney"></i>
                    <div>Home</div>
                </Link>
                <Link className={styles['single-navicon-container']} to={'/my-products'}>
                    <i class="fa-solid fa-code-pull-request"></i>
                    <div>My products</div>
                </Link>
                <Link className={styles['single-navicon-container']} to={'/add-product'}>
                    <i class="fa-solid fa-plus"></i>
                    <div>Lend</div>
                </Link>
                <Link className={styles['single-navicon-container']} to={'/my-orders'} >
                    <i class="fa-solid fa-store"></i>
                    <div>My orders</div>
                </Link>
                <div className={styles['profile-navicon-container']}>
                    <div className={styles['profile-image-container']}>
                        <img src={process.env.PUBLIC_URL + '/images/dummyProfile.jpg'} alt="profile" />
                    </div>
                    <div className={styles['profile-me-container']}>
                        <div>me</div>
                    <i class="fa-solid fa-caret-down"></i>
                    </div>
                </div>

            </div>
            <div className={styles['location-container']}>
                <i class="fa-solid fa-location-dot"></i>
                <div className={styles['exact-location']}>chennai</div>
            </div>
        </div>
    );
};

export default IconLocation;
