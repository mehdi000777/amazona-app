import axios from 'axios';

const baseURL = "/api/";

const handelSuccess = ({ response, type, next, qty }) => {
    next({
        data: response.data,
        type,
        reduxData: {
            name: response.data.name,
            image: response.data.image,
            price: response.data.price,
            countInStock: response.data.countInStock,
            product: response.data._id,
            seller: response.data.seller,
            qty,
        }
    });

    return new Promise((resolve, reject) => {
        resolve(response);
    })
}

const handelFaild = ({ error, type, next }) => {
    next({
        type,
        error: error.response && error.response.data.message
            ? error.response.data.message : error.message
    });

    return new Promise((resolve, reject) => {
        reject(error);
    })
}


const apiMiddleware = store => next => action => {

    const { isEndpointCalled, type } = action;

    if (isEndpointCalled) {
        next({ type });

        const { endpoint, method, successType, faildType, qty, data = {}, headers } = action;

        return axios(`${baseURL}${endpoint}`, {
            method,
            data,
            headers
        })
            .then(response => handelSuccess({ response, type: successType, next, qty }))
            .catch(error => handelFaild({ error, type: faildType, next }));
    }
    else {
        next(action);
    }
}


export default apiMiddleware;