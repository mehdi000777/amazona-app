import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderDelete, orderHistoryAdmin, orderReset } from '../Componentes/Order/actions/orderAction';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';

export default function OrderList(props) {

    const sellerMod = props.match.path.indexOf("/seller") >= 0;

    const OrderHistoryAdmin = useSelector(state => state.OrderHistoryAdmin);
    const { loading, error, order } = OrderHistoryAdmin;

    const OrderDelete = useSelector(state => state.OrderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = OrderDelete;

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderReset())
        dispatch(orderHistoryAdmin({ seller: sellerMod ? userInfo._id : '' }));
    }, [dispatch, sellerMod, userInfo._id])

    const deleteHandler = (id) => {
        dispatch(orderDelete(id));
    }

    return (
        <div>
            <h1>Order history</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">Order Delete Success</MessageBox>}

            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
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
                                    <td>{item.user.name}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{item.totalPrice.toFixed(2)}</td>
                                    <td>{item.isPaid ? item.paidAt.substring(0, 10) : "No"}</td>
                                    <td>{item.isDelivered ? item.deliveredAt.substring(0, 10) : "No"}</td>
                                    <td>
                                        <button className="small" onClick={() => { props.history.push(`/order/${item._id}`) }} >
                                            Details
                                        </button>
                                        <button className="small" onClick={() => deleteHandler(item._id)}>
                                            <i className="fa fa-trash"></i>
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
