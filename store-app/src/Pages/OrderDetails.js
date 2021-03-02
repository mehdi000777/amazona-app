import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { delivereReset, detailsOrder, orderDelivere, orderPay, payReset } from '../Componentes/Order/actions/orderAction';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import axios from 'axios';


export default function OrderScreen(props) {
    const orderId = props.match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const OrderDetails = useSelector((state) => state.OrderDetails);
    const { order, loading, error } = OrderDetails;

    const OrderPay = useSelector((state) => state.OrderPay);
    const { success: successPay, loading: loadingPay, error: errorPay } = OrderPay;

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const OrderDelivere = useSelector(state => state.OrderDelivere);
    const { loading: loadingDelivere, error: errorDelivere, success: successDelivere } = OrderDelivere;

    const dispatch = useDispatch();

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await axios.get("/api/config/paypal");
            const Script = document.createElement("script");
            Script.type = "text/javascript";
            Script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            Script.async = true;
            Script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(Script);
        }

        if (!order || successPay || successDelivere || (order && order._id !== orderId)) {
            dispatch(delivereReset());
            dispatch(payReset());
            dispatch(detailsOrder(orderId));
        }
        else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                }
                else {
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, orderId, order, sdkReady, successPay, successDelivere]);


    const successPaymentHandler = (paymentResult) => {
        dispatch(orderPay(order, paymentResult));
    }

    const deliveredHandler = () => {
        dispatch(orderDelivere(order._id));
    }

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.name}<br />
                                            <strong>Address:</strong> {order.shippingAddress.address},
                                             {order.shippingAddress.postalCode}, {order.shippingAddress.city},
                                             {order.shippingAddress.country}
                                        </p>
                                        {
                                            order.isDelivered ? <MessageBox variant="success">Deliver At {order.deliveredAt}</MessageBox>
                                                : <MessageBox variant="danger">Not Delivered</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </p>
                                        {
                                            order.isPaid ? <MessageBox variant="success">Paid At {order.paidAt}</MessageBox>
                                                : <MessageBox variant="danger">Not Paid</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {
                                                order.orderItems.map(item => {
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
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order Total</strong></div>
                                            <div>
                                                <strong>${order.totalPrice.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid &&
                                        <li>
                                            {
                                                !sdkReady ? <LoadingBox /> :
                                                    <>
                                                        {errorPay && <MessageBox variant="success">{errorPay}</MessageBox>}
                                                        {loadingPay && <LoadingBox />}
                                                        <PayPalButton amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}></PayPalButton>

                                                    </>
                                            }
                                        </li>
                                    }
                                    {
                                        order.isPaid && userInfo.isAdmin && !order.isDelivered &&
                                        <li>
                                            {loadingDelivere && <LoadingBox />}
                                            {errorDelivere && <MessageBox variant="danger">{errorDelivere}</MessageBox>}

                                            <button className="primary block" onClick={deliveredHandler}>
                                                Deliver Order
                                            </button>
                                        </li>
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
}
