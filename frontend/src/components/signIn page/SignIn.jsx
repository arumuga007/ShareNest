import styles from './../../styles/signIn page/signInPage.module.css';
import LeftSideGif from './LeftSideGif';
import SignInDetails from './SignInDetails';

const SignInPage = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['inner-container']}>
                <LeftSideGif />
                <SignInDetails />
            </div>
        </div>
    )
}

export default SignInPage;