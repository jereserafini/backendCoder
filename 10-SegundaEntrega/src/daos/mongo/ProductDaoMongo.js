import MongoContainer from "../../container/MongoContainer.js";

class ProductDaoMongo extends MongoContainer {
    constructor() {
        super( 'products', {
            title: {type: String, required: true},
            price: {type: Number, required: true},
            url: {type: String, required: true},
            code: {type: String, required: true},
            description: {type: String, required: true},
            stock: {type: Number, required: true},
            timestamp: {type: String, required: true}
        })
    }
}

export default ProductDaoMongo