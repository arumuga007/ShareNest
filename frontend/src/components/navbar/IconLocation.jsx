import styles from './../../styles/navbar/iconLocation.module.css';

const IconLocation = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['icon-container']}>
                <div className={styles['single-navicon-container']} style={{color: 'black'}}>
                    <i class="fa-solid fa-house-chimney"></i>
                    <div>Home</div>
                </div>
                <div className={styles['single-navicon-container']}>
                    <i class="fa-solid fa-code-pull-request"></i>
                    <div>All request</div>
                </div>
                <div className={styles['single-navicon-container']}>
                    <i class="fa-solid fa-plus"></i>
                    <div>Lend</div>
                </div>
                <div className={styles['single-navicon-container']}>
                    <i class="fa-solid fa-heart"></i>
                    <div>Wishlist</div>
                </div>
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
