import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Componentes/Cart/actions/CartActions';
import MessageBox from '../Componentes/MessageBox';
import { Link } from 'react-router-dom';
import CartList from '../Componentes/Cart/CartList';

export default function Cart(props) {

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.Cart)
    const { cartItems } = Cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])


    const CheckoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    <MessageBox>Cart is empty. <Link to="/">Go shopping</Link></MessageBox>
                    :
                    <CartList />
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal {cartItems.reduce((a, c) => a + c.qty, 0)} item): $
                                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button className="primary block" onClick={CheckoutHandler} disabled={cartItems.length === 0} >Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
