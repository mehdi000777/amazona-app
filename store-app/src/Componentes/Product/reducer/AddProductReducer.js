import { Types } from '../actions/actionTypes';



export const AddProductReduser = (state = {}, action) => {

    switch (action.type) {
        case Types.ADD_PRODUCT:
            return {
                loading: true,
            }
        case Types.ADD_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case Types.ADD_PRODUCT_FAILED:
            return {
                loading: false,
                error: action.error
            }
        case Types.ADD_PRODUCT_RESET:
            return {}
        default:
            return state

    }
}