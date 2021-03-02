import bcrypt from 'bcryptjs';

export const Data = {
    Users: [
        {
            name: "admin",
            email: "Admin@example.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: true,
            isSeller: false,
            seller: {
                rating: 0,
                numReviews: 0,
                name: "",
                logo: "",
                description: ""
            }
        },
        {
            name: "user",
            email: "user@example.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: false,
            isSeller: true,
            seller: {
                rating: 4.5,
                numReviews: 120,
                name: "Lee",
                logo: "./images/1614163020378logo2.png",
                description: "great shoes sellers"
            }
        },
        {
            name: "user2",
            email: "user2@example.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: false,
            isSeller: true,
            seller: {
                rating: 4.5,
                numReviews: 120,
                name: "Puma",
                logo: "./images/logo1.png",
                description: "best shoes sellers"
            }
        }
    ],
    Products: [
        {
            name: "Nike Slim Shirt",
            category: "Shirts",
            image: "/images/p1.jpg",
            price: 120,
            brand: "Nike",
            rating: 4.5,
            countInStock: 10,
            numReviews: 10,
            description: "high quality product",
        },
        {
            name: "Adidas Fit Shirt",
            category: "Shirts",
            image: "/images/p2.jpg",
            price: 189,
            brand: "Adidas",
            rating: 4.0,
            countInStock: 15,
            numReviews: 10,
            description: "This is a great product.",
        },
        {
            name: "Lacoste Free shirt",
            category: "Shirts",
            image: "/images/p3.jpg",
            price: 120,
            brand: "Lacoste",
            rating: 4.8,
            countInStock: 0,
            numReviews: 17,
            description: "high quality product",
        },
        {
            name: "Nike Slim Pant",
            category: "Pants",
            image: "/images/p4.jpg",
            price: 78,
            brand: "Nike",
            rating: 4.5,
            countInStock: 10,
            numReviews: 14,
            description: "high quality product",
        },
        {
            name: "Puma Slim Pant",
            category: "Pants",
            image: "/images/p5.jpg",
            price: 65,
            brand: "Puma",
            rating: 4.5,
            countInStock: 14,
            numReviews: 10,
            description: "high quality product",
        },
        {
            name: "Adidas Fit Pant",
            category: "Pants",
            image: "/images/p6.jpg",
            price: 139,
            brand: "Adidas",
            rating: 3.0,
            countInStock: 12,
            numReviews: 15,
            description: "high quality product",
        },
    ]
}