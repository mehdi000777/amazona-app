import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { fetchCategories } from './Product/actions/productActions';

export default function SlideBar({ openSlide, setOpenSlide }) {

    const Categories = useSelector(state => state.Categories);
    const { loading, error, categories } = Categories;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <aside className={openSlide ? 'open' : ''}>
            <ul className="categories">
                <li>
                    <strong>Categories</strong>
                    <button className="close-sidebar" onClick={() => setOpenSlide(false)} >
                        <i className="fa fa-times"></i>
                    </button>
                </li>

                {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    categories.map((item, index) => {
                        return <li key={index}>
                            <Link to={`/search/category/${item}`}>
                                {item}
                            </Link>
                        </li>
                    })
                }
            </ul>
        </aside>
    )
}
