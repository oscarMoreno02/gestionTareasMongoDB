require('express-group-routes')
const {Router} = require('express');
const router = Router();
const authController=require('../controllers/authController')
const taskController=require('../controllers/taskController')
const userController=require('../controllers/userController')
const rolController=require('../controllers/rolController');
const task = require('../models/task');
const authMid=require('../middlewares/validarJWT')
const rolMid=require('../middlewares/validarRoles')
const taskMid=require('../middlewares/TareaMid')
router.put('/login',authController.login)
router.post('/register',authController.register)

router.group('/task',(router)=>{
    router.get('/availables',authMid.validarJWT,taskController.allAvailableTask)
    router.get('',authMid.validarJWT,taskController.allTask)
    router.get('/:id',authMid.validarJWT,taskController.uniqueTask)
    // router.get('/:id',taskController.uniqueTask)

    router.post('',authMid.validarJWT,rolMid.esAdmin,taskController.insertTask)
    router.put('/status/:id',authMid.validarJWT,rolMid.esAdmin,taskController.editTaskStatus)
    router.put('/progress/:id',authMid.validarJWT,rolMid.esAdmin,taskController.editTaskProgress)
    router.put('/time/:id',authMid.validarJWT,rolMid.esAdmin,taskController.addTaskTime)
    router.delete('/:id',authMid.validarJWT,rolMid.esAdmin,taskController.removeTask)
    
    router.group('/assignment',(router)=>{
        router.put('/add/:id',authMid.validarJWT,rolMid.esAdmin,taskController.editTaskAssignment)
        router.put('/remove/:id',authMid.validarJWT,rolMid.esAdmin,taskController.dropTaskAssignment)
    })
})
router.group('/user',(router)=>{
    router.group('/rol',(router)=>{
        router.get('',authMid.validarJWT,rolMid.esAdmin,rolController.getRolOfAllUser)
        router.get('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.getRolOfUser)

        router.post('',authMid.validarJWT,rolMid.esAdmin,userController.addRolToUser)
        router.delete('',authMid.validarJWT,rolMid.esAdmin,userController.removeRolToUser)
    })
    router.group('/task',(router)=>{
        router.put('/progress/:id',authMid.validarJWT,taskMid.checkAssignment,taskController.editTaskProgress)
        router.put('/status/:id',authMid.validarJWT,taskMid.checkAssignment,taskController.editTaskStatus)
        router.put('/time/:id',authMid.validarJWT,taskMid.checkAssignment,taskController.addTaskTime)
        router.put('/pick/:id',authMid.validarJWT,taskMid.isAvailable,taskController.editTaskAssignment)
    })
    router.get('',authMid.validarJWT,rolMid.esAdmin,userController.allUser)
    router.get('/:id',authMid.validarJWT,rolMid.esAdmin,userController.uniqueUser)
    router.post('',authMid.validarJWT,rolMid.esAdmin,userController.insertUser)
    router.put('/:id',authMid.validarJWT,rolMid.esAdmin,userController.editUserPassword)
    router.delete('/:id',authMid.validarJWT,rolMid.esAdmin,userController.removeUser)

})
router.group('/rol',(router)=>{
    router.get('',authMid.validarJWT,rolMid.esAdmin,rolController.allRol)
    router.get('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.uniqueRol)
    router.post('',authMid.validarJWT,rolMid.esAdmin,rolController.newRol)
    router.put('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.editRolDescription)
    router.delete('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.removeRol)
})

    module.exports = router;