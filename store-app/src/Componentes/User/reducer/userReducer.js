import { Types } from '../actions/userActionTypes';


const initState = {
    userInfo: null,
    loading: false,
    error: false
}

export const userRegisterReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.USER_REGISTER:
            return {
                loading: true
            }
        case Types.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.data
            }
        case Types.USER_REGISTER_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const userSignInReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.USER_SIGNIN:
            return {
                loading: true
            }
        case Types.USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.data
            }
        case Types.USER_SIGNIN_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.USER_SIGNOUT:
            return {
                loading: false,
                userInfo: null
            }
            
        default:
            return state
    }
}