import { Types } from '../actions/orderTypes';


export const orderDelivereReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.ORDER_DELIVERE:
            return {
                loading: true
            }
        case Types.ORDER_DELIVERE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case Types.ORDER_DELIVERE_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.ORDER_DELIVERE_RESET:
            return {}
        default:
            return state
    }
}