import { CartTypes } from '../actions/CartActionTypes';


const initState = {
    cartItems: [],
    error: false,
    shippingAddress: null,
    paymentMethod: null
}


const CartReducer = (state = initState, action) => {

    switch (action.type) {
        case CartTypes.ADD_ITEM_CART:
            return {
                ...state,
            }
        case CartTypes.ADD_ITEM_CART_SUCCESS:
            const item = action.reduxData
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case CartTypes.ADD_ITEM_CART_FAILD:
            return {
                ...state,
                error: action.error
            }
        case CartTypes.REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.delete_id)
            }
        case CartTypes.SAVE_SHIPPIN_ADDRESS:
            return {
                ...state,
                shippingAddress: action.shippingData
            }
        case CartTypes.SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.paymentData
            }
        case CartTypes.CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}

export default CartReducer;