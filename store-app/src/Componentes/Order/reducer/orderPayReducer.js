import { Types } from '../actions/orderTypes';



export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.ORDER_PAY:
            return {
                loading: true
            };
        case Types.ORDER_PAY_SUCCESS:
            return {
                success: true,
                loading: false,
            };
        case Types.ORDER_PAY_FAILD:
            return {
                loading: false,
                error: action.error
            };
        case Types.ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
};