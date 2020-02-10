const IBaseService = require('../base/IBaseService')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDBService extends IBaseService {

    constructor(connection, schema) {
        super()
        this._connection = connection;
        this._collection = schema;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }

    static connect() {
        Mongoose.connect('mongodb://dashAdmin:dashboard@localhost:27017/dashboard', {
            useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true,
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })
        const connection = Mongoose.connection
        //connection.once('open', () => console.log('Conectado ao banco de dados.'))
        return connection;
    }

    async create(item) {
        return this._collection.create(item)
    }
    async listAll(item = {}) {
        return this._collection.find(item)
    }
    async listOne(filter) {
        return this._collection.find(filter)
      }
    async update(id, item) {
        return this._collection.updateOne({_id: id}, { $set: item})
    }
    
    async delete(id) {
        return this._collection.deleteOne({_id: id})
    }
}

module.exports = MongoDBService