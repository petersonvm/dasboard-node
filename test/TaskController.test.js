const assert = require('assert')
const UserController = require('../src/controller/UserController')
const TaskController = require('../src/controller/TaskController')
let controller = {}
let userController = {}
let MOCK_USER_ID = '';
let MOCK_TASK_ID = '';


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

describe('TaskController Suite de testes', function () {

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
        MOCK_USER_ID = result._id
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
        

        MOCK_TASK_ID = result._id
        assert.deepEqual(task, MOCK_TASK)
    })

    it('listar uma tarefa', async () => {
        const resultArray = await controller.listOne(MOCK_TASK_ID)
        const result = resultArray[0]

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


    it('listar tarefas usuario', async () => {
        const result = await controller.listAll(MOCK_USER_ID)

        assert.ok(result.length >= 1)
    })
   
    it('atualizar', async () => {
        const resultArray = await controller.listOne(MOCK_TASK_ID)
        const task = resultArray[0]
        task.title = "TASK Atualizada"         
        const result = await controller.update(MOCK_TASK_ID, task)
        assert.deepEqual(result.nModified, 1)
    })

    it('remover', async () => {
        const result = await controller.delete(MOCK_TASK_ID)
        assert.deepEqual(result.n, 1)
    })

})