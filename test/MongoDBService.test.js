const assert = require('assert')
const MongoDBService = require('../src/db/service/mongodb/MongoDBService')
const UserSchema = require('../src/db/schema/mongodb/UserSchema')
const Service = require('../src/db/service/base/BaseService')

let service = {}
let MOCK_USER_CREATE_ID = '';
let MOCK_USER_UPDATE_ID = '';

const MOCK_USER_CREATE = {
    fullName: 'Usuario de Cadastro',
    username: 'userCreate',
    password: 'teste@123'
};

const MOCK_USER_UPDATE = {
    fullName: 'Usuario de Atualização',
    username: 'userUpdate',
    password: 'teste@123'
};

describe('MongoDB Suite de testes', function () {

    this.beforeAll(async () => {
        const connection = MongoDBService.connect()
        service = new Service(new MongoDBService(connection, UserSchema))

        const result = await service.create(MOCK_USER_UPDATE)
        MOCK_USER_UPDATE_ID = result._id
    })

    it('verificar conexao', async () => {
        const result = await service.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const result = await service.create(MOCK_USER_CREATE)

        const user = { 
            fullName: result.fullName, 
            username: result.username, 
            password: result.password
        }

        MOCK_USER_CREATE_ID = result._id
        assert.deepEqual(user, MOCK_USER_CREATE)
    })

    it('listar', async () => {
        const [{ fullName, username, password}] = await service.listOne({ username: MOCK_USER_CREATE.username})
        const result = {
            fullName, username, password
        }
        assert.deepEqual(result, MOCK_USER_CREATE)
    })

    it('listar todos', async () => {
        const result = await service.listAll()
        assert.ok(result.length >= 2)
    })
   
   
    it('atualizar', async () => {
        const result = await service.update(MOCK_USER_UPDATE_ID, {
            fullName: 'Nome Completo',
            updatedAt: Date.now()

        })
        assert.deepEqual(result.nModified, 1)
    })

    it('remover - User Created', async () => {
        const result = await service.delete(MOCK_USER_CREATE_ID)
        assert.deepEqual(result.n, 1)
    })
   
    it('remover - User Updated', async () => {
        const result = await service.delete(MOCK_USER_UPDATE_ID)
        assert.deepEqual(result.n, 1)
    })
})