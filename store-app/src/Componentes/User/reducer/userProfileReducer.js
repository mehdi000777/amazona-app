import { Types } from '../actions/userActionTypes';


export const userProfileReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case Types.USER_PROFILE:
            return {
                loading: true
            }
        case Types.USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: action.data
            }
        case Types.USER_PROFILE_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}