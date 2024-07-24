import styles from './../../../styles/home page/landing page/landingPage.module.css';
import ImpressiveFeature from './ImpressiveFeature';
import HowItWorks from './howItWorks';
import IntroPage from './introPage';
import ProductsNearByYou from './productsNearByYou';
import WhyYouChoose from './whyYouChoose';

const LandingPage = () => {
    return (
        <div className={styles['container']}>
            <IntroPage />        
            <ImpressiveFeature />
            <WhyYouChoose />
            <HowItWorks />
            <ProductsNearByYou />
        </div>
    )
}

export default LandingPage;