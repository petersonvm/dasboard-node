const BaseRoute = require('./base/BaseRoute')
const Joi = require('joi')

class TaskRoutes extends BaseRoute {
    constructor(controller) {
        super()
        this.controller = controller
    }
}


module.exports = TaskRoutes