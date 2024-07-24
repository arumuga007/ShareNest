import styles from './../../../styles/home page/landing page/impressiveFeature.module.css';

const ImpressiveFeature = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                Our Impressive Feature
            </div>
        <div className={styles['feature-container']}>
            <div className={styles['single-feature-container']}>
                <div className={styles['image-container']}>
                    <img src={process.env.PUBLIC_URL + '/images/uniqueFeature/connectWithneighbour.svg'} />
                </div>
                <div className={styles['feature-description-container']}>
                    <div className={styles['description-title']}>
                        Borrow items from your neighbour
                    </div>
                    <div className={styles['description-subtitle']}>
                    Borrow everyday items conveniently from nearby neighbors, fostering a sense of community and resourcefulness
                    </div>
                </div>
            </div>
            <div className={styles['single-feature-container']}>
                <div className={styles['image-container']}>
                    <img src={process.env.PUBLIC_URL + '/images/uniqueFeature/earnMoney.svg'} />
                </div>
                <div className={styles['feature-description-container']}>
                    <div className={styles['description-title']}>
                        Earn money by giving out your items
                    </div>
                    <div className={styles['description-subtitle']}>
                    Generate income by renting out your belongings to your local people, leveraging community sharing for financial benefit
                    </div>
                </div>
            </div>
            <div className={styles['single-feature-container']}>
                <div className={styles['image-container']}>
                    <img src={process.env.PUBLIC_URL + '/images/uniqueFeature/saveMoney.svg'} />
                </div>
                <div className={styles['feature-description-container']}>
                    <div className={styles['description-title']}>
                        Save money by borrowing a item for rent
                    </div>
                    <div className={styles['description-subtitle']}>
                    Cut costs by renting items when needed, accessing resources affordably through community sharing
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ImpressiveFeature;