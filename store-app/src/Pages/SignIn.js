import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignIn } from '../Componentes/User/actions/userActions';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';

export default function SignIn(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo, loading, error } = UserSignIn;

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            userSignIn(email, password)
        )
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sing In</h1>
                </div>
                <div>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
