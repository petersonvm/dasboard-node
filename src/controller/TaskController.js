const MongoDBService = require('../db/service/mongodb/MongoDBService')
const TaskSchema = require('../db/schema/mongodb/TaskSchema')
const Service = require('../db/service/base/BaseService')

class TaskController {

    constructor() {
        const connection = MongoDBService.connect()
        this._service = new Service(new MongoDBService(connection, TaskSchema))
    }

    create(task) {
        return this._service.create(task)
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

module.exports = TaskController