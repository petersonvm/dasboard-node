const assert = require('assert')
const UserController = require('../src/controller/UserController')
let controller = {}
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

describe('UserController Suite de testes', function () {

    this.beforeAll(async () => {
        controller = new UserController();
        
        const result = await controller.create(MOCK_USER_UPDATE)
        MOCK_USER_UPDATE_ID = result._id
    })

    it('cadastrar', async () => {
        const result = await controller.create(MOCK_USER_CREATE)

        const user = { 
            fullName: result.fullName, 
            username: result.username, 
            password: result.password
        }

        MOCK_USER_CREATE_ID = result._id
        assert.deepEqual(user, MOCK_USER_CREATE)
    })

    it('listar', async () => {
        const [{ fullName, username, password}] = await controller.listOne(MOCK_USER_CREATE.username)
        const result = {
            fullName, username, password
        }
        assert.deepEqual(result, MOCK_USER_CREATE)
    })

    it('listar todos', async () => {
        const result = await controller.listAll()
        assert.ok(result.length >= 2)
    })
   
    it('atualizar', async () => {
        const userToUpdate = controller.listOne(MOCK_USER_UPDATE.username)
        userToUpdate.fullName = "Nome Completo"         
        const result = await controller.update(MOCK_USER_UPDATE_ID, userToUpdate)
        assert.deepEqual(result.nModified, 1)
    })

    it('remover - User Created', async () => {
        const result = await controller.delete(MOCK_USER_CREATE_ID)
        assert.deepEqual(result.n, 1)
    })
   
    it('remover - User Updated', async () => {
        const result = await controller.delete(MOCK_USER_UPDATE_ID)
        assert.deepEqual(result.n, 1)
    })
})