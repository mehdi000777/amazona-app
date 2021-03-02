import React, { useEffect } from 'react';
import { fetchProducts } from '../Componentes/Product/actions/productActions';
import { getUserProfile } from '../Componentes/User/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import Product from '../Componentes/Product/Product';
import Rating from '../Componentes/Product/Rating';

export default function Seller(props) {

    const sellerId = props.match.params.id;

    const UserProfile = useSelector((state) => state.UserProfile);
    const { loading, error, user } = UserProfile;

    const ProductList = useSelector((state) => state.ProductList);
    const { loading: loadingProducts, error: errorProducts, products } = ProductList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(sellerId));
        dispatch(fetchProducts({ seller: sellerId }));
    }, [dispatch, sellerId]);
    return (
        <div className="row top">
            <div className="col-1">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <ul className="card card-body">
                                <li>
                                    <div className="row start">
                                        <div className="p-1">
                                            <img
                                                className="small"
                                                src={`../${user.seller.logo}`}
                                                alt={user.seller.name}
                                            ></img>
                                        </div>
                                        <div className="p-1">
                                            <h1>{user.seller.name}</h1>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Rating
                                        product={user.seller}
                                    ></Rating>
                                </li>
                                <li>
                                    <a href={`mailto:${user.email}`}>Contact Seller</a>
                                </li>
                                <li>{user.seller.description}</li>
                            </ul>
                        )}
            </div>
            <div className="col-3">
                {loadingProducts ?
                    <LoadingBox />
                    : errorProducts ?
                        <MessageBox variant="danger">{errorProducts}</MessageBox>
                        :
                        <>
                            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                            <div className="row center">
                                <Product products={products} />
                            </div>
                        </>
                }
            </div>
        </div>
    );
}
