import { Types } from '../actions/actionTypes';



export default function ProductDtailsReduser(state = { loading: true }, action) {

    switch (action.type) {
        case Types.FETCH_PRODUCT_DTAILS:
            return {
                loading: true,
            }
        case Types.FETCH_PRODUCT_DTAILS_SUCCESS:
            return {
                loading: false,
                product: action.data
            }
        case Types.FETCH_PRODUCT_DTAILS_FAILED:
            return {
                loading: false,
                error: action.error
            }    
        default:
            return state

    }
}
