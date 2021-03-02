import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { editPordut, fetchProductDtails } from '../Componentes/Product/actions/productActions';

export default function EditPorduct(props) {

    const id = props.match.params.id;

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [productimage, setProductimage] = useState();
    const [price, setPrice] = useState();
    const [brand, setBrand] = useState();
    const [countInStock, setCountInStock] = useState();
    const [description, setDescription] = useState();

    const ProductDitals = useSelector(state => state.ProductDitals);
    const { loading, error, product } = ProductDitals;


    const dispatch = useDispatch();

    useEffect(() => {
        if (!product || product._id !== id) {
            dispatch(fetchProductDtails(id));
        }
        else {
            setName(product.name);
            setCategory(product.category);
            setPrice(product.price);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [dispatch, id, product])

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("category", category);
        data.append("productimage", productimage);
        data.append("price", price);
        data.append("brand", brand);
        data.append("countInStock", countInStock);
        data.append("description", description);
        dispatch(editPordut(id, data))
        props.history.push("/productlist")
    }

    return (
        <div>
            <form className="form" encType="multipart/form-data" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product</h1>
                </div>
                {loading ? <LoadingBox /> : error ? <MessageBox variant="dange">{error}</MessageBox> :
                    <>
                        <div>
                            <lable htmlFor="name">Name</lable>
                            <input type="text" id="name" value={name} placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <lable htmlFor="image">image</lable>
                            <input type="file" id="image" placeholder="Enter Image"
                                onChange={(e) => setProductimage(e.target.files[0])} />
                        </div>
                        <div>
                            <lable htmlFor="category">category</lable>
                            <input type="text" id="category" value={category} placeholder="Enter Category"
                                onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div>
                            <lable htmlFor="price">price</lable>
                            <input type="number" id="price" value={price} placeholder="Enter Price"
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <lable htmlFor="brand">brand</lable>
                            <input type="text" id="brand" value={brand} placeholder="Enter Brand"
                                onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div>
                            <lable htmlFor="countInStock">countInStock</lable>
                            <input type="number" id="countInStock" value={countInStock} placeholder="Enter CountInStock"
                                onChange={(e) => setCountInStock(e.target.value)} />
                        </div>
                        <div>
                            <lable htmlFor="description">description</lable>
                            <input type="text" id="description" value={description} placeholder="Enter Description"
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div>
                            <button type="submit" className="primary">submit</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
