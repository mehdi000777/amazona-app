import { Types } from '../actions/userActionTypes';


export const userUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.USER_UPDATE_ADMIN:
            return {
                loading: true
            }
        case Types.USER_UPDATE_ADMIN_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case Types.USER_UPDATE_ADMIN_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.USER_UPDATE_ADMIN_RESET:
            return {}
        default:
            return state
    }
}