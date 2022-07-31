import MongoContainer from "../../container/MongoContainer.js";

class CartDaoMongo extends MongoContainer {
    constructor() {
        super( 'carts', {
            timestamp: {type: String, required: true},
            products: {type: String, required: true}
        })
    }
}

export default CartDaoMongo