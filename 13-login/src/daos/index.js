import dotenv from "dotenv";
dotenv.config();

let ProductDao
let CartDao
let UserDao

switch (process.env.DATABASE) {
    case "mongo":
        const { default: ProductDaoMongo } = await import('./mongo/ProductDaoMongo.js')
        const { default: CartDaoMongo } = await import('./mongo/CartDaoMongo.js')
        const { default: UserDaoMongo } = await import ('./mongo/UserDaoMongo.js')

        ProductDao = new ProductDaoMongo()
        CartDao = new CartDaoMongo()
        UserDao = new UserDaoMongo()
    break;

    case "firebase":
        const { default: ProductDaoFirebase } = await import('./firebase/ProductDaoFirebase.js')
        const { default: CartDaoFirebase } = await import('./firebase/CartDaoFirebase.js')

        ProductDao = new ProductDaoFirebase()
        CartDao = new CartDaoFirebase()
    break;
}

export { ProductDao, CartDao, UserDao }