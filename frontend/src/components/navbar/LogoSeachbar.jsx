import styles from './../../styles/navbar/logoSearchbar.module.css';

const LogoSearchbar  = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['logo-container']}>
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" />
            </div>
            <div className={styles['search-container']}>
                <input type='text' placeholder='Search'></input>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}

export default LogoSearchbar;