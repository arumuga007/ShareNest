import styles from './../../styles/login page/loginpage.module.css';
import { Link } from 'react-router-dom';
const LoginBtn = () => {
    return (
        <div className={styles['existing-account']}>
            <div>Already have an account?</div>
            <Link className={styles['login-btn']} to={'/login'}>
                Login
            </Link>
        </div>
    )
}

export default LoginBtn;