import { Types } from '../actions/orderTypes';


export const orderHistoryReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case Types.ORDER_HISTORY:
            return {
                loading: true
            }
        case Types.ORDER_HISTORY_SUCCESS:
            return {
                loading: false,
                order: action.data
            }
        case Types.ORDER_HISTORY_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}