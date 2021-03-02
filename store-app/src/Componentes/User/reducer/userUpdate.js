import { Types } from '../actions/userActionTypes';



export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case Types.USER_UPDATE:
            return {
                loading: true
            }
        case Types.USER_UPDATE_SUCCESS:
            localStorage.setItem("userInfo", JSON.stringify(action.data));
            return {
                loading: false,
                success: true,
            }
        case Types.USER_UPDATE_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}