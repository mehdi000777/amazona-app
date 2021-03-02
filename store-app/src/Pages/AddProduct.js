import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Componentes/Product/actions/productActions';

export default function AddProduct(props) {

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [productimage, setProductimage] = useState();
    const [price, setPrice] = useState();
    const [brand, setBrand] = useState();
    const [countInStock, setCountInStock] = useState();
    const [description, setDescription] = useState();

    const dispatch = useDispatch();

    const submitHandler = () => {
        const data = new FormData();
        data.append("productimage", productimage);
        data.append("name", name);
        data.append("category", category);
        data.append("price", price);
        data.append("brand", brand);
        data.append("countInStock", countInStock);
        data.append("description", description);
        dispatch(addProduct(data))
        props.history.push("/productlist")
    }

    return (
        <div>
            <form className="form" encType="multipart/form-data" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" placeholder="Enter Image"
                        onChange={(e) => setProductimage(e.target.files[0])} required />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" value={category} placeholder="Enter Category"
                        onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={price} placeholder="Enter Price"
                        onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" value={brand} placeholder="Enter Brand"
                        onChange={(e) => setBrand(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="countInStock">CountInStock</label>
                    <input type="number" id="countInStock" value={countInStock} placeholder="Enter CountInStock"
                        onChange={(e) => setCountInStock(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} placeholder="Enter Description"
                        onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <button type="submit" className="primary">submit</button>
                </div>
            </form>
        </div>
    )
}
