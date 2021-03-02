import { Types } from '../actions/userActionTypes';


export const topSellerReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case Types.USER_TOPSELLER_LIST:
            return {
                loading: true
            }
        case Types.USER_TOPSELLER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.data
            }
        case Types.USER_TOPSELLER_LIST_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}