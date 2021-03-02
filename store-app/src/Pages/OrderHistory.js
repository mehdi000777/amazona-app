import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderHistory } from '../Componentes/Order/actions/orderAction';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';

export default function OrderHistory(props) {

    const OrderHistory = useSelector(state => state.OrderHistory);
    const { loading, order, error } = OrderHistory;

    console.log(order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderHistory());
    }, [dispatch])

    return (
        <div>
            <h1>Order history</h1>
            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map(item => {
                                return <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{item.totalPrice.toFixed(2)}</td>
                                    <td>{item.isPaid ? item.paidAt.substring(0, 10) : "No"}</td>
                                    <td>{item.isDelivered ? item.deliveredAt.substring(0, 10) : "No"}</td>
                                    <td>
                                        <button className="small" onClick={() => { props.history.push(`/order/${item._id}`) }} >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
