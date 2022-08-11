import FirebaseContainer from "../../container/FirebaseContainer.js";

class ProductDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products')
    }
}

export default ProductDaoFirebase