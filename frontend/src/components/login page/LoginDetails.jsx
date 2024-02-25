import { useRef } from 'react';
import styles from './../../styles/login page/loginDetails.module.css';
import ExactLocation from './login details/ExactLocation';
import LocationDetailsForm from './login details/LocationDetailsForm';
import PersonalDetailsForm from './login details/PersonalDetailsForm';

const LoginDetails = () => {

    let personalInformation = useRef(null);
    let locationDetails = useRef(null);
    let exactLocation = useRef(null);
    const userInfo = new Array(14).fill('');

    return (
        <div className={styles['container']}>
            <div className={styles['logo-header-container']}>
                <div className={styles['logo-container']}>
                    <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" /> {/* Use %PUBLIC_URL% */}
                </div>
                <div className={styles['header']}>
                    Create new Account
                </div>
            </div>
            <div className={styles['details-container']}>
                <PersonalDetailsForm nextBtn={locationDetails} selfRef = {personalInformation} userInfo={userInfo}/>
                <LocationDetailsForm nextBtn = {exactLocation} backBtn = {personalInformation} selfRef = {locationDetails} userInfo={userInfo}/>
                <ExactLocation backBtn = {locationDetails} selfRef = {exactLocation} userInfo={userInfo} />
            </div>
        </div>
    )
}

export default LoginDetails;
