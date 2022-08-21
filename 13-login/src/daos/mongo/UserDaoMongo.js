import MongoContainer from "../../container/MongoContainer.js";

class UserDaoMongo extends MongoContainer {
    constructor() {
        super( 'users', {
            username: {type: String, required: true},
            password: {type: String, required: true},
            email: {type: String, required: true},
            firstName: {type: String, required: true},
            lastName: {type: String, required: true}
        })
    }
}

export default UserDaoMongo