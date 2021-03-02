import { Types } from '../actions/orderTypes';


const initState = {
    order: null,
    loading: true,
    error: false
}

export const orderDtailsReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.ORDER_DTAILS:
            return {
                ...state,
                loading: true
            };
        case Types.ORDER_DTAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.data
            };
        case Types.ORDER_DTAILS_FAILD:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};