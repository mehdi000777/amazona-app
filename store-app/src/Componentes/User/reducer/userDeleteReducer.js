import { Types } from '../actions/userActionTypes';


export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.USER_DELETE:
            return {
                loading: true
            }
        case Types.USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case Types.USER_DELETE_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.USER_DELETE_RESET:
            return {}
        default:
            return state
    }
}