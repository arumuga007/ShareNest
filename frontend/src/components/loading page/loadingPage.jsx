import styles from './../../styles/loading page/loadingPage.module.css';
import { loadingAnimation } from '../../Illustrations json/loadingPage/loadingAnimation';
import { useEffect, useRef } from 'react';

const LoadingPage = () => {
    /* global bodymovin */
    const gifRef = useRef(null);
    useEffect(() => {
        var options = {
            container: gifRef.current,
            renderer: 'svg', 
            loop: true,
            autoplay: true,
            animationData: loadingAnimation
        };
        var anim = bodymovin.loadAnimation(options);
        return () => {
           if (anim) {
               anim.destroy();
           }
       };
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['animation-container']} ref={gifRef}></div>
            <div className={styles['loading-text']}>Please wait...</div>
        </div>
    )
}

export default LoadingPage;