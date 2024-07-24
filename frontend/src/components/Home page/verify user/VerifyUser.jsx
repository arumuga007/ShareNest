import styles from './.././../../styles/signIn page/signInPage.module.css';
import LeftSideGif from './LeftGif';
import VerifyDetails from './verifyDetails';

const VerifyUser = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['inner-container']}>
                <LeftSideGif />
                <VerifyDetails />
            </div>
        </div>
    )
}

export default VerifyUser;