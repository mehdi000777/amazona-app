import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from './actions/CartActions';

export default function CartList() {

    const Cart = useSelector(state => state.Cart)
    const { cartItems } = Cart
    const dispatch = useDispatch();

    const romoveItemCartHandler = (id) => {
        dispatch(
            removeFromCart(id)
        )
    }

    return (
        <ul>
            {
                cartItems.map(item => {
                    return <li key={item.product} >
                        <div className="row">
                            <div>
                                <img src={`${item.image}`} alt={item.name} className="small" />
                            </div>
                            <div className="min-30">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>
                            <div>
                                <select value={item.qty} onChange={(e) =>
                                    dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map(x => {
                                        return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    })}
                                </select>
                            </div>
                            <div>${item.price}</div>
                            <div>
                                <button onClick={() => romoveItemCartHandler(item.product)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                })
            }
        </ul >
    )
}
