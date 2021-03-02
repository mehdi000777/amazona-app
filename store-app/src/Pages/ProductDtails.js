import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Rating from '../Componentes/Product/Rating';
import { connect } from 'react-redux';
import { fetchProductDtails } from '../Componentes/Product/actions/productActions'
import LoadingBox from '../Componentes/LoadingBox';
import MessageBox from '../Componentes/MessageBox';
import ProductComments from '../Componentes/Product/ProductComments';

class ProductDtails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            adressCart: props.history,
            qty: 1
        }
    }

    componentDidMount() {
        const id = this.state.id
        this.props.fetchProductDtails(id)
    }

    render() {
        const { product, loading, error } = this.props;

        const addToCartHandler = () => {
            this.state.adressCart.push(`/cart/${this.state.id}?qty=${this.state.qty}`)
        }

        return (
            <>
                { loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <div>
                        <Link to="/">Back to Resulst</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img src={`${product.image}`} alt={product.name} className="large" />
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li>
                                        <Rating product={product} />
                                    </li>
                                    <li>
                                        Price : $ {product.price}
                                    </li>
                                    <li>
                                        <p>Description : {product.description}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                Seller
                                                <h2>
                                                    <Link to={`/seller/${product.seller._id}`}>
                                                        {product.seller.seller.name}
                                                    </Link>
                                                </h2>
                                            </div>
                                            <Rating product={product.seller.seller} />
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">$ {product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>{product.countInStock > 0 ? <span className="success">In Stock</span>
                                                    : <span className="danger">Unavailable</span>}</div>
                                            </div>
                                        </li>
                                        {product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div>
                                                            <select value={this.state.qty} onChange={e => this.setState({ qty: e.target.value })}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x =>
                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Add to Card</button>
                                                </li>
                                            </>
                                        )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ProductComments product={product} />
                    </div>
                }
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        product: state.ProductDitals.product,
        loading: state.ProductDitals.loading,
        error: state.ProductDitals.error,
    }
}

const mapDispatchToProps = {
    fetchProductDtails,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDtails);