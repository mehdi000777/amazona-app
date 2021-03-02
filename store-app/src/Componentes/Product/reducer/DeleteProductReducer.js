import { Types } from '../actions/actionTypes';



export const DeleteProductReducer = (state = {}, action) => {

    switch (action.type) {
        case Types.DELETE_PRODUCT:
            return {
                loading: true,
            }
        case Types.DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case Types.DELETE_PRODUCT_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.DELETE_PRODUCT_RESET:
            return {}
        default:
            return state

    }
}