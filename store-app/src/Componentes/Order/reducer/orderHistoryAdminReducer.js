import { Types } from '../actions/orderTypes';


export const orderHistoryAdminReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case Types.ORDER_HISTORY_ADMIN:
            return {
                loading: true
            }
        case Types.ORDER_HISTORY_ADMIN_SUCCESS:
            console.log(action.data);
            return {
                loading: false,
                order: action.data
            }
        case Types.ORDER_HISTORY_ADMIN_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}