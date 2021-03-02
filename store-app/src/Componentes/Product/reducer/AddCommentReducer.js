import { Types } from '../actions/actionTypes';



export const AddCommentReducer = (state = {}, action) => {

    switch (action.type) {
        case Types.ADD_COMMENT:
            return {
                loading: true,
            }
        case Types.ADD_COMMENT_SUCCESS:
            return {
                loading: false,
                success: true,
                review: action.data
            }
        case Types.ADD_COMMENT_FAILD:
            return {
                loading: false,
                error: action.error
            }
        case Types.ADD_COMMENT_RESET:
            return {}
        default:
            return state

    }
}