import express from 'express';
import mongoose from 'mongoose';
import productRouter from './Routers/productRouter.js';
import userRouter from './Routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './Routers/orderRouter.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

// app.get("/", (req, res) => {
//   res.send("server is starting")
// });
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/store-app/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/store-app/build/index.html'))
);

app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_MAP_KEY || '')
})

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});