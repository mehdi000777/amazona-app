import { Types } from '../actions/actionTypes';



export const FetchCategoriesReducer = (state = { loading: true }, action) => {

    switch (action.type) {
        case Types.FETCH_CATEGORIES:
            return {
                loading: true,
            }
        case Types.FETCH_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.data
            }
        case Types.FETCH_CATEGORIES_FAILD:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state

    }
}