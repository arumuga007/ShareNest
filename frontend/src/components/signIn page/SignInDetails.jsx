import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import styles from './../../styles/signIn page/signInDetails.module.css';

const SignInDetails = () => {

    const emailSpanRef = useRef(null);
    const passwordSpanRef = useRef(null);
    const userName = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const loginUser = () => {
        const userDetail = [userName.current.value, password.current.value];
        fetch('http://localhost:5000/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userDetail: userDetail })
        })
        .then((res) => {
            setSubmitted(false);
            if (!res.ok) {
                throw new Error('Invalid login credentials');
            }
            return res.json();
        })
        .then((data) => {
            const token = data;
            Cookies.set('token', token, { expires: 7, sameSite:'None', secure: true });
            if(userName.current.value == "admin@gmail.com")
                navigate('/admin-page');
            else
                navigate("/home")
        })
        .catch((error) => {
            console.log(error.message);
            setMessage("invalid login details");
        });
    }

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
                {   message != "" &&
                    <div className={styles['invalid-msg']}>{message}</div>}
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>email <span ref={emailSpanRef}>*</span></div>
                    <input type='text' onChange={(event) => {
                        let email = event.target.value;
                        setMessage("");
                        if (email.length > 0)
                            emailSpanRef.current.style.color = 'green';
                        else
                        emailSpanRef.current.style.color = 'red';
                    }} ref={userName}/>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>password <span ref={passwordSpanRef}>*</span></div>
                    <input type='password' onChange={(event) => {
                        let email = event.target.value;
                        setMessage("");
                        if (email.length > 0)
                            passwordSpanRef.current.style.color = 'green';
                        else
                            passwordSpanRef.current.style.color = 'red';
                    }} ref={password}
                    />
                </div>
                <button className={`${styles['next-button']} ${submitted && styles['disable-btn']}`} onClick={() => {
                    setSubmitted(true);
                    loginUser();
                }} disabled={submitted} >
                    <span>Login</span>
                    <p></p>
                </button>
                <div className={styles['signup-forgot-container']}>
                    <Link className={styles['signup']} to={'/sign-up'}>
                        sign up
                    </Link>
                    <Link className={styles['forgot']}>
                        forgot password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignInDetails;