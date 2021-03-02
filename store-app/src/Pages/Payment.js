import React, { useState } from 'react'
import Checkout from '../Componentes/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../Componentes/Cart/actions/CartActions';

export default function Payment(props) {

    const Cart = useSelector(state => state.Cart);
    const { shippingAddress } = Cart

    if (!shippingAddress.address) {
        props.history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            savePaymentMethod(paymentMethod)
        )
        props.history.push("/placeorder");
    }

    return (
        <div>
            <Checkout step1 step2 step3 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="Paypal" name="paymentMethod" checked required onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div>
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <div>
                    </div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
