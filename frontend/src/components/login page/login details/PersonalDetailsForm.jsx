import { useRef, useState } from 'react';
import styles from './../../../styles/login page/login details/loginForms.module.css';
import LoginBtn from '../LoginBtn';

const PersonalDetailsForm = (props) => {

    const [isValid, setIsValid] = useState(Array(6).fill(false));
    const setValue =(event, index) => {
        setIsValid(Array(6).fill(false));
        props.userInfo[index] = event.target.value;
    }

    const checkValues = () => {
        let newValid = new Array(6).fill(false);
        console.log('checkValue called');
        for(let i = 0; i < 6; i++) {
            if(props.userInfo[i] == "") {
                newValid[i] = true
                setIsValid(newValid)
                return false;
            }
        }
        console.log(props.userInfo);
        return true;
    }

    return (
        <div className={styles['container']} ref={props.selfRef}>
            <div className={styles.header}>
                Personal Information
            </div>
            <div className={styles['input-container']}>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>name <span>*</span></div>
                    <input type='text'  required onChange={(event) => setValue(event,0)} className={`${isValid[0] && styles['invalid-input']}`}/>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>name cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>set password <span>*</span></div>
                    <input type='password' required onChange={(event) => setValue(event,1)} className={`${isValid[1] && styles['invalid-input']}`}/>
                    <div className={`${styles['warning-text']} ${isValid[1] && styles['show-warning']}`}>password cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>email <span>*</span></div>
                    <input type='text' required onChange={(event) => setValue(event,2)} className={`${isValid[2] && styles['invalid-input']}`}/>
                    <div className={`${styles['warning-text']} ${isValid[2] && styles['show-warning']}`}>email cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>whatsapp no <span>*</span></div>
                    <input type='text' required onChange={(event) => setValue(event,3)} className={`${isValid[3] && styles['invalid-input']}`}/>
                    <div className={`${styles['warning-text']} ${isValid[3] && styles['show-warning']}`}>enter a valid number</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>bank account no<span>*</span></div>
                    <input type='number' required onChange={(event) => setValue(event,4)} className={`${isValid[4] && styles['invalid-input']}`}/>
                    <div className={`${styles['warning-text']} ${isValid[4] && styles['show-warning']}`}>account no cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>IFSC code<span>*</span></div>
                    <input type='text' required className={`${isValid[5] && styles['invalid-input']}`} onChange={(event) => setValue(event,5)} />
                    <div className={`${styles['warning-text']} ${isValid[5] && styles['show-warning']}`}>IFSC code cannot be empty</div>
                </div>
            </div>
            <div className={styles['next-btn']} onClick={() => {
                if(!checkValues()) return;
                console.log("next clicked") 
                console.log(props.selfRef)
                props.selfRef.current.style.left = '-120%';
                props.selfRef.current.style.right = '120%';
                props.nextBtn.current.style.left = 0;
                props.nextBtn.current.style.right = 0;
            }} >next</div>
            <LoginBtn />
        </div>
    )
}

export default PersonalDetailsForm;