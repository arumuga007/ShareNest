import { useEffect } from 'react';
import styles from './../../../styles/home page/successful page/successful.module.css';
import { successfulLoad } from '../../../Illustrations json/loadingPage/successfulLoadin';
import { useRef } from 'react';

const Successful = () => {

         /* global bodymovin */
         const gifRef = useRef(null);
         useEffect(() => {
             var options = {
                 container: gifRef.current,
                 renderer: 'svg', 
                 loop: true,
                 autoplay: true,
                 animationData: successfulLoad
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
            <div className={styles['inner-container']}>
                <div className={styles['image-container']} ref={gifRef}>
                    {/* <img src={process.env.PUBLIC_URL + '/images/success.png'} /> */}
                </div>
                    <div className={styles['details-container']}>
                        <div className={styles['header']}>
                        Payment Successful
                        <hr></hr>
                        </div>
                        <div className={styles['amount-container']}>
                        <div className={styles['amount']}>
                            Amount paid: <span> $1200</span>
                        </div>
                        <div className={styles['payed-by']}>
                            Payed by: <span> Debit card</span>
                        </div>
                        
                    </div>
                    <div className={styles['btn']}>Go to Orders</div>
                </div>
            </div>
        </div>
    )
}

export default Successful;