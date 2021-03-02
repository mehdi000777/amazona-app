import { Types } from '../actions/orderTypes';

const initState = {
    order: {},
    loading: false,
    success: false,
    error: false
}

export const orderReduser = (state = initState, action) => {
    switch (action.type) {
        case Types.CREATE_ORDER:
            return {
                ...state,
                loading: true,
            }
        case Types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                order: action.data.order,
                success: true,
                loading: false,
            }
        case Types.CREATE_ORDER_FAILD:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case Types.CREATE_ORDER_RESET:
            return {}
        default:
            return state
    }
}

