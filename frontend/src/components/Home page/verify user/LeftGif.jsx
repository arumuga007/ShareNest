import { useEffect, useRef } from 'react';
import styles from './.././../../styles/signIn page/leftSideGif.module.css';
import { verifyAadharIllustration } from '../../../Illustrations json/verifyAadhar';


const LeftSideGif = () => {
    /* global bodymovin */
    const gifRef = useRef(null);
    
    useEffect(() => {
        var options = {
            container: gifRef.current,
            renderer: 'svg', 
            loop: true,
            autoplay: false,
            animationData: verifyAadharIllustration
        };
        var anim = bodymovin.loadAnimation(options);
    }, [])
    return (
        <div className={styles['verify-gif-container']} ref={gifRef}>

        </div>
    )
}

export default LeftSideGif;