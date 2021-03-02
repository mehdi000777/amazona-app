import { Types } from '../actions/orderTypes';


export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.ORDER_DELETE:
            return {
                loading: true
            }
        case Types.ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case Types.ORDER_DELETE_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.ORDER_DELETE_RESET:
            return {}
        default:
            return state
    }
}