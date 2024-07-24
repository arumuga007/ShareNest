import { useEffect, useRef, useState } from 'react';
import styles from './../../../styles/home page/landing page/howItWork.module.css';
import { one } from '../../../Illustrations json/landingpage/one';
import { two } from '../../../Illustrations json/landingpage/two';
import { three } from '../../../Illustrations json/landingpage/three';
import { four } from '../../../Illustrations json/landingpage/four';
import { five } from '../../../Illustrations json/landingpage/five';
import { six } from '../../../Illustrations json/landingpage/six';

const HowItWorks = () => {

    /* global bodymovin */
    const [selectedOption, setSelectedOption] = useState(true);
    const animationRefs = useRef([]);

    useEffect(() => {
        animationRefs.current.forEach((ref, index) => {
            console.log(ref)
            const options = {
                container: ref,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: featureItems[index].lottieAnimationName
            };
            var anim = bodymovin.loadAnimation(options);
        });

        // return () => {
        //     animationRefs.current.forEach(ref => {
        //       if (ref.current.animationInstance) {
        //         ref.current.animationInstance.destroy(); // Clean up each animation when component unmounts
        //       }
        //     });
        //   };
    }, []);

    let featureItems = [
        {
            lottieAnimationName: one,
            title: 'search',
            description: 'search for a product you want to take rent'
        },
        {
            lottieAnimationName: six,
            title: 'Become member',
            description: 'Verify your profile to become the part of your local community'
        },
        {
            lottieAnimationName: five,
            title: 'Enjoy',
            description: 'Make use of the item, enjoy and bring it back at the arranged time'
        },
        {
            lottieAnimationName: three,
            title: 'Add items',
            description: 'Add item which you will use rarely'
        },
        {
            lottieAnimationName: five,
            title: 'Lend them',
            description: 'Lend your added product to your local community people'
        },
        {
            lottieAnimationName: two,
            title: 'Earn money',
            description: 'you will get the desired amount for the each day'
        }
    ]
    return (
        <div className={styles['container']}>
            <div className={styles['header-text']}>
                How does ShareNest work?
            </div>

            <div className={styles['option-container']}>
                <div className={`${styles['option']} ${selectedOption && styles['selected-option']}`} onClick={() => setSelectedOption(true)}>
                    Lend
                </div>
                <div className={`${styles['option']} ${!selectedOption && styles['selected-option']}`} onClick={() => setSelectedOption(false)}>
                    Borrow
                </div>
            </div>
            
            <div className={styles['feature-container']}>
            {
                featureItems.map((singleFeature, index) => {
                    return (
                            <div className={`${styles['single-feature-container']} ${index < 3 ? selectedOption && styles['show-feature'] : !selectedOption && styles['show-feature']}`}>
                                <div className={styles['gif-container']} ref={ref => animationRefs.current[index] = ref}>
                                    
                                </div>
                                <div className={styles['item-title']}>
                                    {singleFeature.title}
                                </div>
                                <div className={styles['item-description']}>
                                    {singleFeature.description}
                                </div>
                            </div>
                        
                    );
                })
            }
            </div>
        </div>
    )
}

export default HowItWorks;