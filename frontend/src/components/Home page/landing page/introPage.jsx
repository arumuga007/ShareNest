import styles from './../../../styles/home page/landing page/introPage.module.css';
import { introGif } from '../../../Illustrations json/introGif';
import { useEffect, useRef } from 'react';

const IntroPage = () => {
     /* global bodymovin */
     const gifRef = useRef(null);
     useEffect(() => {
         var options = {
             container: gifRef.current,
             renderer: 'svg', 
             loop: true,
             autoplay: true,
             animationData: introGif
         };
         var anim = bodymovin.loadAnimation(options);
         return () => {
            if (anim) {
                anim.destroy(); // Clean up the animation when component unmounts
            }
        };
     }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['left-container']}>
                <div className={styles['intro-para']}>
                Rent What You <span>Crave</span> at a Fraction of the <span>Price</span>
                </div>
                <div className={styles['intro-subpara']}>
                    ShareNest is a colloborative rental application which helps you borrow and rent a item from local community people
                </div>
                <div className={styles['intro-btn']}>
                    Explore Items
                </div>
            </div>
            <div className={styles['right-gif']} ref={gifRef}>

            </div>
        </div>
    )
}

export default IntroPage;