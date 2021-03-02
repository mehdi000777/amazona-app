import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { getUserProfile, updateUser } from '../Componentes/User/actions/userActions';
import { Types } from '../Componentes/User/actions/userActionTypes';

export default function Profile(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const UserProfile = useSelector(state => state.UserProfile);
    const { loading, error, user } = UserProfile;

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const UserUpdate = useSelector(state => state.UserUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success } = UserUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({ type: Types.USER_UPDATE_RESET, isEndpointCalled: false });
            dispatch(getUserProfile(userInfo._id));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            if (user.seller) {
                setSellerName(user.seller.name);
                setSellerDescription(user.seller.description);
            }
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("password and confirm password are not match")
        }
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        data.append("sellerName", sellerName);
        data.append("sellerDescription", sellerDescription);
        data.append("sellerLogo", sellerLogo);
        data.append("uesrId", userInfo._id);
        dispatch(updateUser(data));
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox />
                        : error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                {loadingUpdate && <LoadingBox />}
                                {errorUpdate && (
                                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                                )}
                                {success && (
                                    <MessageBox variant="success">
                                        Profile Updated Successfully
                                    </MessageBox>
                                )}
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" onChange={(e) => { setName(e.target.value) }}
                                        placeholder="Enter Name" value={name} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" onChange={(e) => { setEmail(e.target.value) }}
                                        placeholder="Enter Email" value={email} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }}
                                        placeholder="Enter Password" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" id="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        placeholder="Enter Confirm Password" />
                                </div>
                                {user.isSeller && (
                                    <>
                                        <h2>Seller</h2>
                                        <div>
                                            <label htmlFor="sellerName">Seller Name</label>
                                            <input
                                                id="sellerName"
                                                type="text"
                                                placeholder="Enter Seller Name"
                                                value={sellerName}
                                                onChange={(e) => setSellerName(e.target.value)}
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="sellerLogo">Seller Logo</label>
                                            <input
                                                id="sellerLogo"
                                                type="file"
                                                placeholder="Enter Seller Logo"
                                                onChange={(e) => setSellerLogo(e.target.files[0])}
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="sellerDescription">Seller Description</label>
                                            <input
                                                id="sellerDescription"
                                                type="text"
                                                placeholder="Enter Seller Description"
                                                value={sellerDescription}
                                                onChange={(e) => setSellerDescription(e.target.value)}
                                            ></input>
                                        </div>
                                    </>

                                )}
                                <div>
                                    <label />
                                    <button type="submit" className="primary block">Update Profile</button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}
