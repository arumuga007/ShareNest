import { useEffect, useState } from 'react';
import styles from './../../../styles/login page/login details/loginForms.module.css';
import districts from './state-district.json';

const getDistricts = (stateName) => {
    const districtByState = districts.states;
    for(let i = 0; i < districtByState.length; i++) {
        if(districtByState[i].state == stateName) {
            return districtByState[i].districts;
        }
    }
    return [];
}

const LocationDetailsForm = (props) => {

    const [states, setStates] = useState([]);
    const [district, setDistrict] = useState([]);

    useEffect(() => {
        props.selfRef.current.style.left = '120%';
        fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country: 'India'
        })
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res.data.states;
        })
        .then((states) => {
            setStates(states);
        })
    }, [])

    const [isValid, setIsValid] = useState(Array(6).fill(false))

    const setValue =(event, index) => {
        setIsValid(Array(6).fill(false));
        props.userInfo[index] = event.target.value;
    }

    const checkValues = () => {
        let newValid = new Array(6).fill(false);
        console.log('checkValue called');
        for(let i = 6; i < 12; i++) {
            console.log(props.userInfo[i]);
            if(props.userInfo[i] == '') {
                newValid[i] = true
                console.log('called');
                setIsValid(newValid)
                return false;
            }
        }
        return true;
    }

    return (
        <div className={`${styles['location-container']} ${styles['container']}`} ref={props.selfRef}>
            <div className={styles.header}>
                Location Information
            </div>
            <div className={styles['input-container']}>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>select your country <span>*</span></div>
                    <select>
                        <option key='india'>India</option>
                        <option key='others' disabled>currently available in india only</option>
                    </select>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>select a valid country</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>select your state <span>*</span></div>
                    <select onChange={(event) => {
                        let stateName = event.target.value;
                        console.log(stateName)
                        setDistrict(getDistricts(event.target.value));
                    }}>
                        <option disabled>select your state</option>
                        {
                            states.length == 0
                            ? <option disabled>please wait for a minute</option>
                            : states.map((value) => {
                                return <option>{value.name}</option>
                            })
                        }
                    </select>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>name cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>select your district <span>*</span></div>
                    <select>
                    <option value='' disabled defaultChecked>select your district</option>
                        {
                            district.length == 0
                            ? <option>No district available</option>
                            : district.map((value, key) => {
                                return <option value={value} key={key}>{value}</option>
                            })
                        }
                    </select>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>name cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>village/town <span>*</span></div>
                    <input type='text' required/>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>name cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>door no <span>*</span></div>
                    <input type='text' required/>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>name cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>street <span>*</span></div>
                    <input type='text' required/>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>name cannot be empty</div>
                </div>
            </div>
            <div className={styles['btn-container']}>
                <div className={styles['back-button']} onClick={() => {
                    props.selfRef.current.style.left = '120%';
                    props.selfRef.current.style.right = '-120%';
                    props.backBtn.current.style.right = '0';
                    props.backBtn.current.style.left = '0';
                }}>back</div>
                <div className={styles['next-button']} onClick={() => {
                    props.selfRef.current.style.left = '-120%';
                    props.selfRef.current.style.right = '120%';
                    props.nextBtn.current.style.left = '0';
                    props.nextBtn.current.style.right = '0';
                    console.log(props.userInfo);
                }}>next</div>
                
            </div>
        </div>
    )
}

export default LocationDetailsForm;