const assert = require('assert')
const UserController = require('../src/controller/UserController')
const TaskController = require('../src/controller/TaskController')
let controller = {}
let userController = {}
let MOCK_USER_ID = '';


const MOCK_USER_TASK = {
    fullName: 'Usuario de Tasks',
    username: 'userTask',
    password: 'teste@123'
};

const MOCK_ATTACH = [{
    title: 'Anexo 1',
    url: 'http://www.google.com'
},
{
    title: 'Anexo 2',
    url: 'http://www.uol.com.br'
}
]

const MOCK_TASK = {
    title: 'Task Teste',
    detail: 'Detalhes',
    attachment: MOCK_ATTACH,
    tags: [
        'TAG_1',
        'TAG_2'
    ],
    isCompleted: false,
    dateTime: Date.now(),
    ownerId: ''
}

describe('UserController Suite de testes', function () {

    this.beforeAll(async () => {
        userController = new UserController();
        controller = new TaskController();

        let result = {}
        try{
            const [{ _id}] = await userController.listOne(MOCK_USER_TASK.username)
            result._id = _id
        }catch(error){
            result = await userController.create(MOCK_USER_TASK)
        }

        MOCK_TASK.ownerId  = result._id.toString()
    })

    it('cadastrar', async () => {
        const result = await controller.create(MOCK_TASK)
  
        let attch = []
        for (const att of result.attachment) {
            attch.push({title:att.title, url:att.url})
        }
        
        
        const task = {
            title: result.title,
            detail: result.detail,
            attachment: attch,
            tags:  result.tags,
            isCompleted: result.isCompleted,
            dateTime: result.dateTime.getTime(),
            ownerId: result.ownerId
        }
        
        assert.deepEqual(task, MOCK_TASK)
    })

    // it('listar', async () => {
    //     const [{ fullName, username, password}] = await controller.listOne(MOCK_USER_CREATE.username)
    //     const result = {
    //         fullName, username, password
    //     }
    //     assert.deepEqual(result, MOCK_USER_CREATE)
    // })

    // it('listar todos', async () => {
    //     const result = await controller.listAll()
    //     assert.ok(result.length >= 2)
    // })
   
    // it('atualizar', async () => {
    //     const userToUpdate = controller.listOne(MOCK_USER_UPDATE.username)
    //     userToUpdate.fullName = "Nome Completo"         
    //     const result = await controller.update(MOCK_USER_UPDATE_ID, userToUpdate)
    //     assert.deepEqual(result.nModified, 1)
    // })

    // it('remover - User Created', async () => {
    //     const result = await controller.delete(MOCK_USER_CREATE_ID)
    //     assert.deepEqual(result.n, 1)
    // })
   
    // it('remover - User Updated', async () => {
    //     const result = await controller.delete(MOCK_USER_UPDATE_ID)
    //     assert.deepEqual(result.n, 1)
    // })
})