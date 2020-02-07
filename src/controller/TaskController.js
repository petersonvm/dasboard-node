const Mongoose =  require('mongoose');
const TaskSchema = require('../db/schema/mongodb/TaskSchema')

class TaskController {

    constructor(dbConnection) {
        this.dbConnection = dbConnection
    }
}


module.exports = TaskController