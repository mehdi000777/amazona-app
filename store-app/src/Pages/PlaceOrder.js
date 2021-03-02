import React, { useEffect } from 'react'
import CheckOut from '../Componentes/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../Componentes/Order/actions/orderAction';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { Types } from '../Componentes/Order/actions/orderTypes';

export default function PlaceOrder(props) {

    const Cart = useSelector(state => state.Cart);
    const { shippingAddress, paymentMethod, cartItems } = Cart;
    const { name, address, postalCode, city, country } = shippingAddress;

    const Order = useSelector(state => state.Order);
    const { loading, error, order, success } = Order;

    if (!paymentMethod) {
        props.history.push("/payment")
    }

    const toPrice = (num) => Number(num.toFixed(2));
    Cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0));
    Cart.shippingPrice = Cart.itemsPrice >= 100 ? toPrice(0) : toPrice(10);
    Cart.taxPrice = toPrice(.15 * Cart.itemsPrice);
    Cart.totalPrice = Cart.itemsPrice + Cart.shippingPrice + Cart.taxPrice;

    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: Types.CREATE_ORDER_RESET });
        }
    }, [success])

    const placeorderHandler = () => {
        dispatch(
            createOrder({ ...Cart, orderItems: cartItems })
        )
    }

    return (
        <div>
            <CheckOut step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {name}<br />
                                    <strong>Address:</strong> {address}, {postalCode}, {city}, {country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cartItems.map(item => {
                                            return <li key={item.product} >
                                                <div className="row">
                                                    <div>
                                                        <img src={`../../${item.image}`} alt={item.name} className="small" />
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>{item.qty}  * {item.price} = $ {item.qty * item.price}</div>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul >
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${Cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${Cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>tax</div>
                                    <div>${Cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div>
                                        <strong>${Cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block" onClick={placeorderHandler} disabled={cartItems.length === 0}>
                                    Place Order</button>
                            </li>
                            {loading && <LoadingBox />}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
