import { useRef } from 'react';
import styles from './../../styles/signIn page/signInDetails.module.css';

const SignInDetails = () => {

    const emailSpanRef = useRef(null);
    const passwordSpanRef = useRef(null);

    return (
        <div className={styles['container']}>
            <div className={styles['logo-header-container']}>
                <div className={styles['logo-container']}>
                    <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" /> {/* Use %PUBLIC_URL% */}
                </div>
            </div>
            <div className={styles['input-container']}>
                <div className={styles['input-header']}>
                    Login to continue
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>email <span ref={emailSpanRef}>*</span></div>
                    <input type='text' onChange={(event) => {
                        let email = event.target.value
                        if (email.length > 0)
                            emailSpanRef.current.style.color = 'green';
                        else
                        emailSpanRef.current.style.color = 'red';
                    }}/>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>password <span ref={passwordSpanRef}>*</span></div>
                    <input type='password' onChange={(event) => {
                        let email = event.target.value
                        if (email.length > 0)
                            passwordSpanRef.current.style.color = 'green';
                        else
                            passwordSpanRef.current.style.color = 'red';
                    }}
                    />
                </div>
                <div className={styles['login-btn']}>
                    Login
                </div>
            </div>
        </div>
    )
}

export default SignInDetails;