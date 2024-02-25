import styles from './../../styles/navbar/navbar.module.css';
import IconLocation from './IconLocation';
import LogoSearchbar from './LogoSeachbar';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <LogoSearchbar />
            <IconLocation />
        </div>
    )
}

export default Navbar;