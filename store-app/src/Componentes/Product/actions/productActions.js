import store from '../../../Share/redux/Store';
import { Types } from './actionTypes';

export const fetchProducts = ({ pageNumber = '', seller = '', name = '', category = '', min = 0, max = 0, rating = 0, order = '' }) => {
    return {
        type: Types.FETCH_PRODUCTS,
        successType: Types.FETCH_PRODUCTS_SUCCESS,
        faildType: Types.FETCH_PRODUCTS_FAILED,
        isEndpointCalled: true,
        endpoint: `Products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`,
        method: "Get"
    }
}

export const fetchProductDtails = (id) => {
    return {
        type: Types.FETCH_PRODUCT_DTAILS,
        successType: Types.FETCH_PRODUCT_DTAILS_SUCCESS,
        faildType: Types.FETCH_PRODUCT_DTAILS_FAILED,
        isEndpointCalled: true,
        endpoint: `Products/${id}`,
        method: "Get"
    }
}

export const addProduct = (data) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.ADD_PRODUCT,
            successType: Types.ADD_PRODUCT_SUCCESS,
            faildType: Types.ADD_PRODUCT_FAILED,
            isEndpointCalled: true,
            endpoint: "Products",
            method: "Post",
            data,
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(fetchProducts({}));
            }
        })
    }
}

export const resetAddProduct = () => {
    return {
        type: Types.ADD_PRODUCT_RESET,
        isEndpointCalled: false
    }
}

export const editPordut = (id, data) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.EDIT_PRODUCT,
            successType: Types.EDIT_PRODUCT_SUCCESS,
            faildType: Types.EDIT_PRODUCT_FAILD,
            isEndpointCalled: true,
            endpoint: `Products/${id}`,
            method: "Put",
            data,
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(fetchProducts({}));
            }
        })
    }
}

export const resetEditProduct = () => {
    return {
        type: Types.EDIT_PRODUCT_RESET,
        isEndpointCalled: false
    }
}

export const deleteProduct = (id) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.DELETE_PRODUCT,
            successType: Types.DELETE_PRODUCT_SUCCESS,
            faildType: Types.DELETE_PRODUCT_FAILD,
            isEndpointCalled: true,
            endpoint: `Products/${id}`,
            method: "Delete",
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(fetchProducts({}));
            }
        })
    }
}

export const resetDeleteProduct = () => {
    return {
        type: Types.DELETE_PRODUCT_RESET,
        isEndpointCalled: false
    }
}

export const fetchCategories = () => {
    return {
        type: Types.FETCH_CATEGORIES,
        successType: Types.FETCH_CATEGORIES_SUCCESS,
        faildType: Types.FETCH_CATEGORIES_FAILD,
        isEndpointCalled: true,
        endpoint: 'Products/categories',
        method: 'Get'
    }
}

export const addComment = (data, id) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.ADD_COMMENT,
            successType: Types.ADD_COMMENT_SUCCESS,
            faildType: Types.ADD_COMMENT_FAILD,
            isEndpointCalled: true,
            endpoint: `Products/${id}/reviews`,
            method: "Post",
            data,
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            }
        }).then(response => {
            if (response.status === 201) {
                dispatch(fetchProductDtails(id));
            }
        })
    }
}

export const addCommentReset = () => {
    return {
        type: Types.ADD_COMMENT_RESET,
        isEndpointCalled: false
    }
}