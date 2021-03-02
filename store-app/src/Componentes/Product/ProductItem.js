import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {

    const { image, name, price, _id, seller } = product;

    return (
        <div className="card">
            <Link to={`/product/${_id}`}>
                <img src={`${image}`} alt={name} className="medium" />
            </Link>
            <div className="card-body">
                <Link to={`/product/${_id}`}>
                    <h2>{name}</h2>
                </Link>
                <Rating product={product} />
                <div className="row">
                    <div className="price">
                        ${price}
                    </div>
                    <div>
                        <Link to={`/seller/${seller._id}`}>
                            {seller.seller.name}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
