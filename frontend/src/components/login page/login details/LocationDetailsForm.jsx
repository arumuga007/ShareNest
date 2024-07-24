import { useEffect, useState } from 'react';
import styles from './../../../styles/login page/login details/loginForms.module.css';
import statesCollection from './state-district.json';

const getDistricts = (stateName) => {
    const districtByState = statesCollection.states;
    for(let i = 0; i < districtByState.length; i++) {
        if(districtByState[i].state == stateName)
            return districtByState[i].districts;
    }
    return [];
}

const LocationDetailsForm = (props) => {
    const [district, setDistrict] = useState([]);
    const [isValid, setIsValid] = useState(Array(6).fill(false));
    props.userInfo[6] = "India";
    useEffect(() => {
        props.selfRef.current.style.left = '120%';
        props.userInfo[7] = statesCollection.states[0].state;
        const newDistricts = getDistricts(props.userInfo[7]);
        setDistrict(newDistricts);
        console.log(district)
    }, [])


    const setValue =(event, index) => {
        setIsValid(Array(6).fill(false));
        props.userInfo[index] = event.target.value;
    }

    const checkValues = () => {
        console.log(props.userInfo);
        let newValid = new Array(6).fill(false);
        console.log('checkValue called');
        for(let i = 6; i < 12; i++) {
            console.log(props.userInfo[i]);
            if(props.userInfo[i] == '') {
                newValid[i - 6] = true
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
                    <select required onChange={(event) => setValue(event, 6)}>
                        <option key='india'>India</option>
                        <option key='others' disabled>currently available in india only</option>
                    </select>
                    <div className={`${styles['warning-text']} ${isValid[0] && styles['show-warning']}`}>select a valid country</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>select your state <span>*</span></div>
                    <select onChange={(event) => {
                        setValue(event, 7)
                        setDistrict(getDistricts(event.target.value));
                        props.userInfo[8] = district[0];
                    }}>
                        <option disabled>select your state</option>
                        {
                            statesCollection.states.map(state => {
                                return <option>{state.state}</option>
                            })
                        }
                    </select>
                    <div className={`${styles['warning-text']} ${isValid[1] && styles['show-warning']}`}>select a valid state</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>select your district <span>*</span></div>
                    <select required onChange={
                        (event) => setValue(event, 8)
                    }>
                    <option value='' disabled defaultChecked>select your district</option>
                        {
                            district.length == 0
                            ? <option>No district available</option>
                            : district.map((value, key) => {
                                return <option value={value} key={key}>{value}</option>
                            })
                        }
                    </select>
                    <div className={`${styles['warning-text']} ${isValid[2] && styles['show-warning']}`}>select a valid district</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>village/town <span>*</span></div>
                    <input type='text' required onChange={
                        (event) => setValue(event, 9)
                    }/>
                    <div className={`${styles['warning-text']} ${isValid[3] && styles['show-warning']}`}>This field cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>door no <span>*</span></div>
                    <input type='text' required onChange={
                        (event) => setValue(event, 10)
                    }/>
                    <div className={`${styles['warning-text']} ${isValid[4] && styles['show-warning']}`}>door no cannot be empty</div>
                </div>
                <div className={styles['input-field-container']}>
                    <div className={styles['input-label']}>street <span>*</span></div>
                    <input type='text' required onChange={
                        (event) => setValue(event, 11)
                    }/>
                    <div className={`${styles['warning-text']} ${isValid[5] && styles['show-warning']}`}>street name cannot be empty</div>
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
                    if(!checkValues()) return;
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