import React, { Component } from 'react';
import Product from '../Componentes/Product/Product';
import { connect } from 'react-redux';
import { fetchProducts } from '../Componentes/Product/actions/productActions';
import HomeCarousel from '../Componentes/HomeCarousel';
import MessageBox from '../Componentes/MessageBox';

class Home extends Component {

    componentDidMount() {
        this.props.fetchProducts({});
    }

    render() {
        const { products, loading, error } = this.props;
        return (
            <main>
                <HomeCarousel />
                <>
                    <h2>Featured Products</h2>
                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <Product products={products} loading={loading} error={error} />
                </>
            </main>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.ProductList.products,
        loading: state.ProductList.loading,
        error: state.ProductList.error
    }
}

const mapDispatchToProps = {
    fetchProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);