import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSignOut } from './User/actions/userActions';
import SearchBox from './SearchBox';
import SlideBar from './SlideBar';

export default function Navbar() {

    const [openSlide, setOpenSlide] = useState(false);

    const Cart = useSelector(state => state.Cart)
    const { cartItems } = Cart
    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(userSignOut());
    }

    return (
        <>
            <header className="row">
                <div>
                    <button className="open-sidebar" onClick={() => setOpenSlide(true)}>
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link to="/" className="brand">amazona</Link>
                </div>
                <div>
                    <Route render={({ history }) => {
                        return <SearchBox history={history} />
                    }} />
                </div>
                <div>
                    <Link to="/cart">Cart
                {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>
                    {
                        userInfo
                            ?
                            <div className="dropdown">
                                <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="#signout" onClick={signOutHandler}>
                                            Sign Out
                                    </Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">
                                            Order History
                                    </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile">
                                            User Profile
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                            : <Link to="/signin">Sign In</Link>
                    }
                    {
                        userInfo && userInfo.isSeller &&
                        <div className="dropdown">
                            <Link to="#">
                                Seller<i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/productlist/seller">
                                        Product
                                </Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/seller">
                                        Orders
                                </Link>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        userInfo && userInfo.isAdmin &&
                        <div className="dropdown">
                            <Link to="#">Admin<i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">
                                        Dashboard
                                </Link>
                                </li>
                                <li>
                                    <Link to="/productlist">
                                        Product
                                </Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">
                                        Orders
                                </Link>
                                </li>
                                <li>
                                    <Link to="/userlist">
                                        Users
                                </Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </header>
            <SlideBar openSlide={openSlide} setOpenSlide={setOpenSlide} />
        </>
    )
}
