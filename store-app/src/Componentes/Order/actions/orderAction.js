import { Types } from './orderTypes';
import { CartTypes } from '../../Cart/actions/CartActionTypes';
import store from '../../../Share/redux/Store';


export const cartEmpty = () => {
    return {
        type: CartTypes.CART_EMPTY,
        isEndpointCalled: false,
    }
}

export const createOrder = (order) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.CREATE_ORDER,
            successType: Types.CREATE_ORDER_SUCCESS,
            faildType: Types.CREATE_ORDER_FAILD,
            isEndpointCalled: true,
            endpoint: `orders/`,
            method: "Post",
            data: order,
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(response => {
            if (response.status === 201) {
                dispatch(cartEmpty());
                localStorage.removeItem("cartItems");
            }
        })
    }
}


export const detailsOrder = (orderId) => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.ORDER_DTAILS,
        successType: Types.ORDER_DTAILS_SUCCESS,
        faildType: Types.ORDER_DTAILS_FAILD,
        isEndpointCalled: true,
        endpoint: `orders/${orderId}`,
        method: "Get",
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
}


export const orderPay = (order, paymentResult) => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.ORDER_PAY,
        successType: Types.ORDER_PAY_SUCCESS,
        faildType: Types.ORDER_PAY_FAILD,
        isEndpointCalled: true,
        endpoint: `orders/${order._id}/pay`,
        method: "put",
        data: paymentResult,
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
}

export const payReset = () => {
    return {
        type: Types.ORDER_PAY_RESET,
        isEndpointCalled: false
    }
}


export const orderHistory = () => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.ORDER_HISTORY,
        successType: Types.ORDER_HISTORY_SUCCESS,
        faildType: Types.ORDER_HISTORY_FAILD,
        isEndpointCalled: true,
        endpoint: "orders/mine",
        method: "Get",
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
}

export const orderHistoryAdmin = ({ seller = '' }) => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.ORDER_HISTORY_ADMIN,
        successType: Types.ORDER_HISTORY_ADMIN_SUCCESS,
        faildType: Types.ORDER_HISTORY_ADMIN_FAILD,
        isEndpointCalled: true,
        endpoint: `orders?seller=${seller}`,
        method: "Get",
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
}

export const orderDelete = (id) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.ORDER_DELETE,
            successType: Types.ORDER_DELETE_SUCCESS,
            faildType: Types.ORDER_DELETE_FAILD,
            isEndpointCalled: true,
            endpoint: `orders/${id}`,
            method: "Delete",
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(orderHistoryAdmin());
            }
        })

    }
}

export const orderReset = () => {
    return {
        type: Types.ORDER_DELETE_RESET,
        isEndpointCalled: false
    }
}


export const orderDelivere = (id) => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.ORDER_DELIVERE,
        successType: Types.ORDER_DELIVERE_SUCCESS,
        faildType: Types.ORDER_DELIVERE_FAILD,
        isEndpointCalled: true,
        endpoint: `orders/${id}/delivere`,
        method: "put",
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
}

export const delivereReset = () => {
    return {
        type: Types.ORDER_DELIVERE_RESET,
        isEndpointCalled: false
    }
}