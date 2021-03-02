import jwt from 'jsonwebtoken';
import multer from 'multer';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};


export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" })
      }
      else {
        req.user = decode;
        next();
      }
    });
  }
  else {
    res.status(401).send({ message: "No Token" })
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  }
  else {
    res.status(401).send({ message: "Invalid Admin Token" })
  }
}

export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  }
  else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
}

export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  }
  else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" })
  }
}


const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "store-app/public/images/");
  },
  filename: (req, file, res) => {
    res(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, res) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    res(null, true)
  }
  else {
    res(null, false)
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})