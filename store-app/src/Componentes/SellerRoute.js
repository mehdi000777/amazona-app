import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function SellerRouter({ component: Component, ...rest }) {

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    return (
        <Route {...rest} render={(props) => userInfo.isSeller ? (<Component {...props}></Component>) :
            <Redirect to="/signin" />
        } />
    )
}
