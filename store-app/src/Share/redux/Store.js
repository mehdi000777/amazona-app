import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import apiMiddleware from './middleware';
import ProductReduser from '../../Componentes/Product/reducer/ProductReduser';
import ProductDtailsReduser from '../../Componentes/Product/reducer/ProductDtailsReduser';
import CartReducer from '../../Componentes/Cart/reducer/CartReducer';
import thunk from 'redux-thunk';
import { userRegisterReducer, userSignInReducer } from '../../Componentes/User/reducer/userReducer';
import { userProfileReducer } from '../../Componentes/User/reducer/userProfileReducer';
import { orderReduser } from '../../Componentes/Order/reducer/orderReducer';
import { orderDtailsReducer } from '../../Componentes/Order/reducer/orderDtailsReducer';
import { orderPayReducer } from '../../Componentes/Order/reducer/orderPayReducer';
import { orderHistoryReducer } from '../../Componentes/Order/reducer/orderHistoryReducer';
import { userUpdateReducer } from '../../Componentes/User/reducer/userUpdate';
import { AddProductReduser } from '../../Componentes/Product/reducer/AddProductReducer';
import { EditProductReducer } from '../../Componentes/Product/reducer/EditProductReducer';
import { DeleteProductReducer } from '../../Componentes/Product/reducer/DeleteProductReducer';
import { orderHistoryAdminReducer } from '../../Componentes/Order/reducer/orderHistoryAdminReducer';
import { orderDeleteReducer } from '../../Componentes/Order/reducer/OrderDelete';
import { orderDelivereReducer } from '../../Componentes/Order/reducer/orderDelivereReducer';
import { userListReducer } from '../../Componentes/User/reducer/userListReducer';
import { userDeleteReducer } from '../../Componentes/User/reducer/userDeleteReducer';
import { userUpdateAdminReducer } from '../../Componentes/User/reducer/userUpdateAdminReducer';
import { topSellerReducer } from '../../Componentes/User/reducer/TopSellerReducer';
import { FetchCategoriesReducer } from '../../Componentes/Product/reducer/FetchCategoriesReducer';
import { AddCommentReducer } from '../../Componentes/Product/reducer/AddCommentReducer';
import { GoogleMapReducer } from '../../Componentes/User/reducer/GoogleMapReducer';

const composeEnhanse = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    UserSignIn: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    },
    Cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
        paymentMethod: "Paypal",
    }
}

const store = createStore(combineReducers({
    ProductList: ProductReduser,
    ProductDitals: ProductDtailsReduser,
    Cart: CartReducer,
    UserSignIn: userSignInReducer,
    UserRegister: userRegisterReducer,
    Order: orderReduser,
    OrderDetails: orderDtailsReducer,
    OrderPay: orderPayReducer,
    OrderHistory: orderHistoryReducer,
    UserProfile: userProfileReducer,
    UserUpdate: userUpdateReducer,
    AddProduct: AddProductReduser,
    EditProduct: EditProductReducer,
    DeleteProduct: DeleteProductReducer,
    OrderHistoryAdmin: orderHistoryAdminReducer,
    OrderDelete: orderDeleteReducer,
    OrderDelivere: orderDelivereReducer,
    UserList: userListReducer,
    UserDelete: userDeleteReducer,
    UserUpdateAdmin: userUpdateAdminReducer,
    TopSeller: topSellerReducer,
    Categories: FetchCategoriesReducer,
    AddComment: AddCommentReducer,
    GoogleMap: GoogleMapReducer
}),
    initialState,
    composeEnhanse(applyMiddleware(apiMiddleware, thunk)));

export default store;