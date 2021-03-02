import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { userDelete, userDeleteReset, userList, userUpdateAdminReset } from '../Componentes/User/actions/userActions';

export default function UserList(props) {

    const UserList = useSelector(state => state.UserList);
    const { users, loading, error } = UserList;

    const UserDelete = useSelector(state => state.UserDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = UserDelete;


    const UserUpdateAdmin = useSelector(state => state.UserUpdateAdmin);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = UserUpdateAdmin;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userUpdateAdminReset());
        dispatch(userDeleteReset());
        dispatch(userList());
    }, [dispatch])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(userDelete(id))
        }
    }

    return (
        <div>
            <div>
                <h1>User List</h1>
            </div>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {successUpdate && <MessageBox variant="success">User Update Success</MessageBox>}

            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Delete Success</MessageBox>}

            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(item => {
                                return <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.isSeller ? "Yes" : "No"}</td>
                                    <td>{item.isAdmin ? "Yes" : "No"}</td>
                                    <td>
                                        <button className="small" onClick={() => props.history.push(`user/${item._id}/edit`)}>
                                            <i className="fa fa-pen"></i>
                                        </button>
                                        <button className="small" onClick={() => deleteHandler(item._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
