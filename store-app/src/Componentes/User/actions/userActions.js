import store from '../../../Share/redux/Store';
import { Types } from './userActionTypes';


export const userRegister = (name, email, password) => {
    return {
        type: Types.USER_REGISTER,
        successType: Types.USER_REGISTER_SUCCESS,
        faildType: Types.USER_REGISTER_FAILD,
        isEndpointCalled: true,
        endpoint: "users/register",
        method: "Post",
        data: { name, email, password }
    }
}

export const userSignIn = (email, password) => {
    return (dispatch, getState) => {
        dispatch({
            type: Types.USER_SIGNIN,
            successType: Types.USER_SIGNIN_SUCCESS,
            faildType: Types.USER_SIGNIN_FAILD,
            isEndpointCalled: true,
            endpoint: "users/signin",
            method: "Post",
            data: { email, password }
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(getState().UserSignIn.userInfo));
            }
        })
    }
}

export const userRegisterAndSignIn = (name, email, password) => {
    return dispatch => {
        dispatch(userRegister(name, email, password)).then(response => {
            if (response.status === 200) {
                dispatch(userSignIn(email, password));
            }
        })
    }
}

export const userSignOut = () => {
    return dispatch => {
        dispatch({
            type: Types.USER_SIGNOUT,
            isEndpointCalled: false,
        });
        localStorage.removeItem("cartItems");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        document.location.href = "/signin";
    }
}


export const getUserProfile = (id) => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.USER_PROFILE,
        successType: Types.USER_PROFILE_SUCCESS,
        faildType: Types.USER_PROFILE_FAILD,
        isEndpointCalled: true,
        endpoint: `users/${id}`,
        method: "Get",
        headers: {
            Authorization: `Bearer ${userInfo?.token}`
        }
    }
}


export const updateUser = (data) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.USER_UPDATE,
            successType: Types.USER_UPDATE_SUCCESS,
            faildType: Types.USER_UPDATE_FAILD,
            isEndpointCalled: true,
            endpoint: "users/profile",
            method: "put",
            data,
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch({ type: Types.USER_SIGNIN_SUCCESS, isEndpointCalled: false, data });
            }
        })
    }
}


export const userList = () => {
    const { UserSignIn: { userInfo } } = store.getState();
    return {
        type: Types.USER_LIST,
        successType: Types.USER_LIST_SUCCESS,
        faildType: Types.USER_LIST_FAILD,
        isEndpointCalled: true,
        endpoint: "users",
        method: "Get",
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
}


export const userDelete = (id) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.USER_DELETE,
            successType: Types.USER_DELETE_SUCCESS,
            faildType: Types.USER_DELETE_FAILD,
            isEndpointCalled: true,
            endpoint: `users/${id}`,
            method: "Delete",
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(userList())
            }
        })
    }
}


export const userDeleteReset = () => {
    return {
        type: Types.USER_DELETE_RESET,
        isEndpointCalled: false
    }
}


export const userUpdateAdmin = (data) => {
    return (dispatch, getState) => {
        const { UserSignIn: { userInfo } } = getState();
        dispatch({
            type: Types.USER_UPDATE_ADMIN,
            successType: Types.USER_UPDATE_ADMIN_SUCCESS,
            faildType: Types.USER_UPDATE_ADMIN_FAILD,
            isEndpointCalled: true,
            endpoint: `users/${data.id}`,
            method: "Put",
            data,
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(response => {
            if (response.status === 200) {
                dispatch(userList())
            }
        })
    }
}


export const userUpdateAdminReset = () => {
    return {
        type: Types.USER_UPDATE_ADMIN_RESET,
        isEndpointCalled: false
    }
}


export const userTopSeller = () => {
    return {
        type: Types.USER_TOPSELLER_LIST,
        successType: Types.USER_TOPSELLER_LIST_SUCCESS,
        faildType: Types.USER_TOPSELLER_LIST_FAILD,
        isEndpointCalled: true,
        endpoint: `users/top-seller`,
        method: "Get",
    }
}

