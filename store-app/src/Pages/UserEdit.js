import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { getUserProfile, userUpdateAdmin } from '../Componentes/User/actions/userActions';

export default function UserEdit(props) {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const id = props.match.params.id;

    const UserProfile = useSelector(state => state.UserProfile);
    const { loading: loadingProfile, error: errorProfile, user } = UserProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user || user._id !== id) {
            dispatch(getUserProfile(id))
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsSeller(user.isSeller);
        }
    }, [dispatch, id, user])

    const submitHandler = () => {
        dispatch(userUpdateAdmin({ id: user._id, name, email, isAdmin, isSeller }));
        props.history.push("/userlist")
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Edit</h1>
                </div>
                {loadingProfile ? <LoadingBox /> : errorProfile ? <MessageBox variant="danger">{errorProfile}</MessageBox> :
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="isSeller">Is Seller</label>
                            <input type="checkbox" id="isSeller" checked={isSeller}
                                onChange={(e) => setIsSeller(e.target.checked)} />
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input type="checkbox" id="isAdmin" checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)} />
                        </div>
                        <div>
                            <button type="submit" className="primary">Submit</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
