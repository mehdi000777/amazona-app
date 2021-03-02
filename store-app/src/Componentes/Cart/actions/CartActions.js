import { CartTypes } from './CartActionTypes';


export const addToCart = (id, qty) => {
    return (dispatch, getState) => {
        dispatch({
            type: CartTypes.ADD_ITEM_CART,
            successType: CartTypes.ADD_ITEM_CART_SUCCESS,
            faildType: CartTypes.ADD_ITEM_CART_FAILD,
            isEndpointCalled: true,
            endpoint: `Products/${id}`,
            method: "Get",
            qty
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
            }
        })

    }
}

export const removeFromCart = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: CartTypes.REMOVE_ITEM_CART,
            isEndpointCalled: false,
            delete_id: id
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
    }
}


export const saveShippinAddress = (data) => {
    return dispatch => {
        dispatch({
            type: CartTypes.SAVE_SHIPPIN_ADDRESS,
            isEndpointCalled: false,
            shippingData: data
        });
        localStorage.setItem("shippingAddress", JSON.stringify(data));
    }
}

export const savePaymentMethod = (data) => {
    return {
        type: CartTypes.SAVE_PAYMENT_METHOD,
        isEndpointCalled: false,
        paymentData: data
    }
}