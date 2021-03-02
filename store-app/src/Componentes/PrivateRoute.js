import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    return (
        <Route {...rest} render={(props) => userInfo ? (<Component {...props}></Component>) :
            <Redirect to="/signin" />
        } />
    )
}
