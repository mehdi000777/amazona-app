import { Types } from '../actions/userActionTypes';


export const userListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case Types.USER_LIST:
            return {
                loading: true
            }
        case Types.USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.data
            }
        case Types.USER_LIST_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}