import { useEffect } from 'react';
import styles from './../../../styles/login page/login details/loginForms.module.css';
import { MapContainer,Marker, Popup } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';

const ExactLocation = (props) => {

    /* L */

    useEffect(() => {
        props.selfRef.current.style.left = '120%';
    }, [])

    return (
        <div className={`${styles['exact-location-container']} ${styles['container']}`} ref={props.selfRef}>
            <div className={styles.header}>
                select your exact location
            </div>
    <MapContainer center={[8.709264037507273, 77.62139081954957]} zoom={10} scrollWheelZoom={false}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <Marker position={[8.709264037507273, 77.62139081954957]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
  </Marker> */}
</MapContainer>
            <div className={styles['btn-container']}>
                <div className={styles['back-button']} onClick={() => {
                    props.selfRef.current.style.left = '120%';
                    props.selfRef.current.style.right = '-120%';
                    props.backBtn.current.style.left = '0';
                    props.backBtn.current.style.right = '0';
                }}>back</div>
                <div className={styles['next-button']}>submit</div>
            </div>
        </div>
    )
}

export default ExactLocation;