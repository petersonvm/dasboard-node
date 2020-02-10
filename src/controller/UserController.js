const MongoDBService = require('../db/service/mongodb/MongoDBService')
const UserSchema = require('../db/schema/mongodb/UserSchema')
const Service = require('../db/service/base/BaseService')

class UserController {

    constructor() {
        const connection = MongoDBService.connect()
        this._service = new Service(new MongoDBService(connection, UserSchema))
    }

    create(user) {
        return this._service.create(user)
    }

    listAll() {
        return this._service.listAll()
    }

    listOne(username) {
        return this._service.listOne({ username })
    }

    update(id, user) {
        user.updateAt = Date.now()
        return this._service.update(id, user)
    }

    delete(id) {
        return this._service.delete(id)
    }
}

module.exports = UserController