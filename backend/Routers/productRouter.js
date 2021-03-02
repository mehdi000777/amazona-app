import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Data } from '../Data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAuth, isAdmin, upload, isSellerOrAdmin } from '../utilts.js';
import fs from 'fs'

const productRouter = express.Router()

productRouter.get("/", expressAsyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const seller = req.query.seller || '';
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

    const priceFilter = max && min ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {}
    const orderSort = order === "lowest" ? { price: 1 } : order === "highest" ? { price: -1 } :
        order === "toprated" ? { rating: -1 } : { _id: -1 }
    const categoryFilter = category ? { category } : {};
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};


    const count = await Product.count({ ...sellerFilter, ...nameFilter, ...categoryFilter, ...priceFilter, ...ratingFilter });
    const products = await Product.find({ ...sellerFilter, ...nameFilter, ...categoryFilter, ...priceFilter, ...ratingFilter }).populate(
        'seller', 'seller.name seller.logo'
    ).sort(orderSort).skip(pageSize * (page - 1)).limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
}));

productRouter.get("/categories", expressAsyncHandler(async (req, res) => {
    const categorys = await Product.find().distinct('category');
    res.send(categorys);
}))

productRouter.get("/seed", expressAsyncHandler(async (req, res) => {
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
        const products = Data.products.map((product) => ({ ...product, seller: seller._id }));
        const createdProducts = await Product.insertMany(products);
        res.send({ createdProducts });
    }
    else {
        res.status(500).send({ message: 'No seller found. first run /api/users/seed' });
    }
}));

productRouter.get("/:id", expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
    );

    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: "Product not Found" });
    }

}));

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        if (product.reviews.find(item => item.name === req.user.name)) {
            res.status(400).send({ message: "You already submitted a review" })
        }
        else {
            const review = {
                name: req.body.name,
                comment: req.body.comment,
                rating: Number(req.body.rating)
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: "Review Created",
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        }
    }
    else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

productRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    upload.single("productimage"),
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            seller: req.user._id,
            name: req.body.name,
            image: "." + req.file.path.slice(16, req.file.path.length),
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            countInStock: req.body.countInStock,
            rating: 3,
            numReviews: 0,
            description: req.body.description,
        });
        const createdProduct = await product.save();
        res.send({
            _id: createdProduct._id,
            name: createdProduct.name,
            image: createdProduct.image,
            price: createdProduct.price,
            category: createdProduct.category,
            brand: createdProduct.brand,
            countInStock: createdProduct.countInStock,
            rating: createdProduct.rating,
            numReviews: createdProduct.numReviews,
            description: createdProduct.description,
            seller: createdProduct.seller
        });
    })
);

productRouter.put('/:id', isAuth, isSellerOrAdmin, upload.single("productimage"), expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        if (req.file) {
            if (product.image) {
                const imageName = product.image.slice(1, product.image.length);
                fs.unlinkSync(`store-app/public/${imageName}`)
            }
            product.image = req.file.path.slice(16, req.file.path.length);
        }
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updateProduct = await product.save();
        res.send({ message: "Product Update", product: updateProduct });
    }
    else {
        res.status(404).send({ message: "Product Not Found" })
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        if (product.image) {
            const imageName = product.image.slice(2, product.image.length);
            fs.unlinkSync(`store-app/public/${imageName}`)
        }
        const deletePorduct = await product.remove();
        res.send({ message: "Product Deleted", product: deletePorduct })
    }
    else {
        res.status(404).send({ message: "Product Not Found" });
    }
}));

export default productRouter;