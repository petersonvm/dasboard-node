const Mongoose =  require('mongoose');
const UserSchema = require('../db/schema/mongodb/UserSchema')
const MongoDBService = require('../db/service/mongodb/MongoDBService')

class UserController {

    constructor() {
        this._dbConnection = MongoDBService
        this._collection = UserSchema
    }
}


module.exports = UserController