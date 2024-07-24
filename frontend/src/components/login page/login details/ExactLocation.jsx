import { useEffect, useState } from 'react';
import styles from './../../../styles/login page/login details/loginForms.module.css';
import { MapContainer,Marker, Popup, useMapEvents } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ExactLocation = (props) => {
    const [markerPosition, setMarkerPosition] = useState([8.709264037507273, 77.62139081954957]);
    const [clickedPosition, setClickedPosition] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        props.selfRef.current.style.left = '120%';
    }, [])


    const HandleMapClick = ({ latlng }) => {
        setMarkerPosition([latlng.lat, latlng.lng]);
        setClickedPosition(latlng);
    }

    const loginUser = (userInfo) => {
        fetch('http://localhost:5000/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userInfo: userInfo})
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to create user. Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const token = data;
            Cookies.set('token', token, { expires: 7, sameSite:'None', secure: true });
            navigate("/home");
        })
        .catch((err) => {
            console.error('Error occurred while creating a user:', err);
        });
    }
    

    return (
        <div className={`${styles['exact-location-container']} ${styles['container']}`} ref={props.selfRef}>
            <div className={styles.header}>
                Select your exact location
            </div>
            <MapContainer center={markerPosition} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={markerPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapClickHandler onClick={HandleMapClick} />
            </MapContainer>
            <div className={styles['btn-container']}>
                <div className={styles['back-button']} onClick={() => {
                    props.selfRef.current.style.left = '120%';
                    props.selfRef.current.style.right = '-120%';
                    props.backBtn.current.style.left = '0';
                    props.backBtn.current.style.right = '0';
                }}>Back</div>
                <button className={`${styles['next-button']} ${submitted && styles['disable-btn']}`} onClick={() => {
                    props.userInfo[12] = clickedPosition.lat;
                    props.userInfo[13] = clickedPosition.lng;
                    console.log(props.userInfo);
                    setSubmitted(true);
                    loginUser(props.userInfo);
                }} disabled={submitted} >
                    <span>Submit</span>
                    <p></p>
                </button>
            </div>
        </div>
    )
}

const MapClickHandler = ({ onClick }) => {
    const map = useMapEvents({
        click: onClick,
    });

    return null;
}

export default ExactLocation;
