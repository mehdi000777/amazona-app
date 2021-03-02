import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Data } from '../Data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth, upload } from '../utilts.js';
import fs from 'fs';


const userRouter = express.Router()



userRouter.get('/top-seller', expressAsyncHandler(async (req, res) => {
  const topSeller = await User.find({ isSeller: true }).sort({ 'seller.rating': -1 }).limit(3);
  res.send(topSeller)
}));


userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
  const createUser = await User.insertMany(Data.Users);
  res.send({ createUser });
}));


userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
          isSeller: user.isSeller
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  const createUser = await user.save();
  res.send({
    _id: createUser._id,
    name: createUser.name,
    email: createUser.email,
    isAdmin: createUser.isAdmin,
    isSeller: user.isSeller,
    token: generateToken(createUser),
  })
}));

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user);
  }
  else {
    console.log(req.params.id);
    res.status(404).send({ message: "User Not Found" });
  }
}));

userRouter.put(
  '/profile',
  isAuth,
  upload.single("sellerLogo"),
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      if (user.isSeller) {
        if (req.file) {
          if (user.seller.logo) {
            const logoName = user.seller.logo.slice(1, user.seller.logo.length);
            fs.unlinkSync(`store-app/public/${logoName}`)
          }
          user.seller.logo = req.file.path.slice(16, req.file.path.length);
        }
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.description = req.body.sellerDescription || user.seller.description
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
}));


userRouter.delete("/:id", isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const deleteUser = user.remove();
    res.send({ message: "User Delete", user: deleteUser });
  }
  else {
    res.status(404).send({ message: "User Not Found" });
  }
}));


userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);

    const userUpdate = user.save();
    res.send({ message: "Update User", user: userUpdate });
  }
  else {
    res.status(404).send({ message: "User Not Found" });
  }
}));


export default userRouter;