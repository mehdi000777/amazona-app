import React from 'react'
import ProductItem from './ProductItem';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

export default function Product({ products, loading, error }) {

    return (
        <div className="row center">
            {
                loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} />
                    })
            }
        </div>
    )
}
