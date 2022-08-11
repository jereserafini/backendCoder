import FirebaseContainer from "../../container/FirebaseContainer.js";

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }
}

export default CartDaoFirebase