import { Types } from '../actions/actionTypes';


const initState = {
    products: [],
    loading: false,
    error: false,
}

export default function ProductReduser(state = initState, action) {

    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case Types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.data.products,
                pages: action.data.pages,
                page: action.data.page
            }
        case Types.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state

    }
}
