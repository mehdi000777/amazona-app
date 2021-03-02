import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippinAddress } from '../Componentes/Cart/actions/CartActions';
import CheckoutSteps from '../Componentes/CheckoutSteps'

export default function Shipping(props) {

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const cart = useSelector(state => state.Cart);
    const { shippingAddress } = cart;

    const GoogleMap = useSelector((state) => state.GoogleMap);
    const { address: addressMap } = GoogleMap;

    if (!userInfo) {
        props.history.push("/signin")
    }

    const [name, setName] = useState(shippingAddress.name);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        const newLat = addressMap ? addressMap.lat : lat;
        const newLng = addressMap ? addressMap.lng : lng;
        if (addressMap) {
            setLat(addressMap.lat);
            setLng(addressMap.lng);
        }
        let moveOn = true;
        if (!newLat || !newLng) {
            moveOn = window.confirm(
                'You did not set your location on map. Continue?'
            );
        }
        if (moveOn) {
            dispatch(
                saveShippinAddress({ name, address, city, postalCode, country, lat: newLat, lng: newLng, })
            );
            props.history.push('/payment');
        }
    };

    const chooseOnMap = () => {
        dispatch(
            saveShippinAddress({ name, address, city, postalCode, country, lat, lng })
        )
        props.history.push("/map")
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter Ctiy" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="country">Coutry</label>
                    <input type="text" id="country" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="chooseOnMap">Location</label>
                    <button type="button" onClick={chooseOnMap}>
                        Choose On Map
                </button>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Cotinue</button>
                </div>
            </form>

        </div>
    )
}
