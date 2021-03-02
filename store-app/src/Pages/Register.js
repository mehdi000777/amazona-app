import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAndSignIn } from '../Componentes/User/actions/userActions';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';

export default function Register(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const UserRegister = useSelector(state => state.UserRegister);
    const { userInfo, loading, error } = UserRegister;

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            alert("password and confirm password are not match")
        }
        dispatch(
            userRegisterAndSignIn(name, email, password)
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
                    <h1>Register</h1>
                </div>
                <div>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" onChange={e => setName(e.target.value)} required />
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
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" id="confirmpassword" placeholder="Enter confirm password" onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Create Accout</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
