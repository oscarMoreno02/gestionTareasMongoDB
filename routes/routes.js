require('express-group-routes')
const {Router} = require('express');
const router = Router();
const authController=require('../controllers/authController')
const taskController=require('../controllers/taskController')
const userController=require('../controllers/userController')
router.put('/login',authController.login)
router.post('/register',authController.register)

router.group('/task',(router)=>{
    router.get('',taskController.allTask)
    router.get('/:id',taskController.uniqueTask)
    router.get('/availables',taskController.allTask)
    router.get('/:id',taskController.uniqueTask)

    router.post('',taskController.insertTask)
    router.put('/status/:id',taskController.editTaskStatus)
    router.put('/progress/:id',taskController.editTaskProgress)
    router.put('/time/:id',taskController.addTaskTime)
    router.delete('/:id',taskController.removeTask)
    
    router.group('/assignment',(router)=>{
        router.put('/add/:id',taskController.editTaskAssignment)
        router.put('/remove/:id',taskController.dropTaskAssignment)
    })
})
router.group('/user',(router)=>{
    router.get('',userController.allUser)
    router.get('/:id',userController.uniqueUser)
    router.post('',userController.insertUser)
    router.put('/:id',userController.editUserPassword)
    router.delete('/:id',userController.removeUser)
    
    router.group('/rol',(router)=>{
            // router.get('',rolController.allRol)
            // router.get('/:id',rolController.uniqueRol)
            // router.post('',rolController.newRol)
            // router.put('/:id',rolController.editRolDescription)
            // router.delete('/:id',rolController.removeRol)
        })
})

    module.exports = router;