import { useEffect, useRef } from 'react';
import styles from './../../styles/signIn page/leftSideGif.module.css';
import { LoginPageIllustration } from '../../Illustrations json/signupPage';


const LeftSideGif = () => {
    /* global bodymovin */
    const gifRef = useRef(null);
    
    useEffect(() => {
        var options = {
            container: gifRef.current,
            renderer: 'svg', 
            loop: true,
            autoplay: true,
            animationData: LoginPageIllustration
        };
        var anim = bodymovin.loadAnimation(options);
    }, [])
    return (
        <div className={styles['container']} ref={gifRef}>

        </div>
    )
}

export default LeftSideGif;