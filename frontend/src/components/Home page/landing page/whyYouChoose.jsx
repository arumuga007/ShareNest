import styles from './../../../styles/home page/landing page/whyYouChoose.module.css';

const WhyYouChoose = () => {
    let featureItems = [
        {
            imageName: process.env.PUBLIC_URL + '/images/whyChooseShareNest/borrowAnything.svg',
            title: 'Borrow anything',
            description: 'Borrow things from your neighbours instead of buying'
        },
        {
            imageName: process.env.PUBLIC_URL + '/images/whyChooseShareNest/saveMoney.svg',
            title: 'Save money',
            description: 'Buy less. Rent for a fraction of the cost'
        },
        {
            imageName: process.env.PUBLIC_URL + '/images/whyChooseShareNest/LendItem.svg',
            title: 'Lend your goods',
            description: '60% of your goods are useless. Make money by lending them'
        },
        {
            imageName: process.env.PUBLIC_URL + '/images/whyChooseShareNest/boostBusiness.svg',
            title: 'Boost your business',
            description: 'If you are rental business men then you are on the right place'
        }
    ]
    return (
        <div className={styles['container']}>
            <div className={styles['header-text']}>
                Why you choose Sharenest?
            </div>
            
            <div className={styles['feature-container']}>
            {
                featureItems.map((singleFeature) => {
                    return (
                            <div className={styles['single-feature-container']}>
                                <div className={styles['image-container']}>
                                    <img src={singleFeature.imageName} />
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

export default WhyYouChoose;