import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import { fetchProducts } from '../Componentes/Product/actions/productActions';
import Product from '../Componentes/Product/Product';
import Rating from '../Componentes/Product/Rating';
import { ratings } from '../Componentes/utils';

export default function Search(props) {

    const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest', pageNumber = 1 } = useParams();

    const ProductList = useSelector(state => state.ProductList);
    const { loading, error, products, page, pages } = ProductList;

    const Categories = useSelector(state => state.Categories);
    const { loading: loadingCategories, error: errorCategories, categories } = Categories;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts({
            pageNumber,
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            min,
            max,
            rating,
            order,
        }));
    }, [dispatch, name, category, min, max, rating, order, pageNumber])


    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const filterOrder = filter.order || order;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${filterOrder}/pageNumber/${filterPage}`;
    };

    return (
        <div>
            <div className="row">
                {loading ? <LoadingBox small /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <h4>{products.length} Results</h4>
                }
                <div>
                    <select value={order} onChange={(e) => props.history.push(getFilterUrl({ order: e.target.value }))}>
                        <option value="newest">Newest Arrivals</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                </div>
            </div>
            <div className="row top pad-lef">
                <div className="col-1">
                    <h3>Department</h3>
                    {loadingCategories ? <LoadingBox small /> : errorCategories ? <MessageBox variant="danger">{errorCategories}</MessageBox> :
                        <ul>
                            <li>
                                <Link className={category === "all" ? "active" : ""} to={getFilterUrl({ category: "all" })}>
                                    Any
                                </Link>
                            </li>
                            {categories.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className={item === category ? 'active' : ''}
                                        to={getFilterUrl({ category: item })}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                    <div className="range">
                        <h3>Price</h3>
                        <lable htmlFor="price">{max}</lable>
                        <div>
                            <input type="range" id="price" max="1000" min="0"
                                onChange={(e) => props.history.push(getFilterUrl({ max: e.target.value, min: 1 }))} />
                        </div>
                    </div>
                    <h3>Rating</h3>
                    <ul>
                        {ratings.map((item) => (
                            <li key={item.name}>
                                <Link
                                    className={item.rating === ratings ? 'active' : ''}
                                    to={getFilterUrl({ rating: item.rating })}>
                                    <Rating product={item} caption=" & Up"></Rating>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-3">
                    {loading ?
                        <LoadingBox></LoadingBox>
                        : error ?
                            <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                {products.length === 0 && (
                                    <MessageBox>No Product Found</MessageBox>
                                )}
                                <div className="row center">
                                    <Product products={products}></Product>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="row center pagination">
                {[...Array(pages).keys()].map(x => {
                    return <Link
                        className={x + 1 === page ? 'active' : ''}
                        key={x + 1}
                        to={getFilterUrl({ page: x + 1 })}
                    >
                        {x + 1}
                    </Link>
                })}
            </div>
        </div >
    )
}
