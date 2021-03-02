import { Types } from '../actions/actionTypes';



export const EditProductReducer = (state = {}, action) => {

    switch (action.type) {
        case Types.EDIT_PRODUCT:
            return {
                loading: true,
            }
        case Types.EDIT_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case Types.EDIT_PRODUCT_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.EDIT_PRODUCT_RESET:
            return {}
        default:
            return state

    }
}