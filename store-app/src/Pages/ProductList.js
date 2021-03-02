import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, resetAddProduct, resetEditProduct } from '../Componentes/Product/actions/productActions';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { Link, useParams } from 'react-router-dom';


export default function ProductList(props) {

    const sellerMod = props.match.path.indexOf("/seller") >= 0;
    const { pageNumber = 1 } = useParams();

    const ProductList = useSelector(state => state.ProductList);
    const { products, loading, error, page, pages } = ProductList;

    const AddProduct = useSelector(state => state.AddProduct);
    const { success: successAdd, loading: loadingAdd, error: errorAdd } = AddProduct;

    const EditProduct = useSelector(state => state.EditProduct);
    const { success: successEdit, loading: loadingEdit, error: errorEdit } = EditProduct;

    const DeleteProduct = useSelector(state => state.DeleteProduct);
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = DeleteProduct;

    const UserSignIn = useSelector(state => state.UserSignIn);
    const { userInfo } = UserSignIn;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetEditProduct());
        dispatch(resetAddProduct());
        dispatch(fetchProducts({ seller: sellerMod ? userInfo._id : '', pageNumber }));
    }, [dispatch, sellerMod, userInfo._id, pageNumber]);


    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={() => props.history.push("/AddProduct")}>
                    Create Product
                </button>
            </div>
            {loadingAdd && <LoadingBox />}
            {errorAdd && <MessageBox variant="danger">{errorAdd}</MessageBox>}
            {successAdd && <MessageBox variant="success">Product Add Success</MessageBox>}

            {loadingEdit && <LoadingBox />}
            {errorEdit && <MessageBox variant="danger">{errorEdit}</MessageBox>}
            {successEdit && <MessageBox variant="success">Product Add Success</MessageBox>}

            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">Product Add Success</MessageBox>}
            {
                loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(item => {
                                    return <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>{item.brand}</td>
                                        <td>
                                            <button className="small" onClick={() => props.history.push(`product/${item._id}/edit`)}>
                                                <i className="fa fa-pen"></i>
                                            </button>
                                            <button className="small" onClick={() => deleteHandler(item._id)} >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
            }
            <div className="row center pagination">
                {[...Array(pages).keys()].map(x => {
                    return <Link
                        key={x + 1}
                        to={`/productlist/pageNumber/${x + 1}`}
                        className={x + 1 === page ? "active" : ""}
                    >
                        {x + 1}
                    </Link>
                })}
            </div>
        </div>
    )
}
