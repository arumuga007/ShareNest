import styles from './../../styles/login page/loginpage.module.css';
import LeftSideGif from './LeftSideGif';
import LoginDetails from './LoginDetails';

const LoginPage = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['inner-container']}>
                <LeftSideGif />
                <LoginDetails />
            </div>
        </div>
    );
}

export default LoginPage;