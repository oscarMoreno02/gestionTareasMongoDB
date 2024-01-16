require('express-group-routes')
const {Router} = require('express');
const router = Router();
const authController=require('../controllers/authController')
const taskController=require('../controllers/taskController')
router.put('/login',authController.login)
router.post('/register',authController.register)

router.group('/task',(router)=>{
    router.get('',taskController.allTask)
    router.get('/:id',taskController.uniqueTask)
    router.post('',taskController.insertTask)
    router.put('/:id',taskController.editTaskStatus)
    router.delete('/:id',taskController.removeTask)
    
    // router.group('/assignment',(router)=>{
    //     router.post('',taskController.assingTask)
    //     router.delete('',taskController.unassingTask)
    // })
})
// router.group('/user',(router)=>{
    //     router.get('',userController.allUser)
    //     router.get('/:id',userController.uniqueUser)
    //     router.post('',userController.insertUser)
    //     router.put('/:id',userController.editUserTfno)
//     router.delete('/:id',userController.removeUser)

//     // router.group('/rol',(router)=>{
    //     //     router.post('',userController.addUserRol)
    //     //     router.delete('',userController.removeUserRol)
    //     // })
    // })
// router.group('/rol',(router)=>{
    //     router.get('',rolController.allRol)
    //     router.get('/:id',rolController.uniqueRol)
    //     router.post('',rolController.newRol)
    //     router.put('/:id',rolController.editRolDescription)
    //     router.delete('/:id',rolController.removeRol)
    // })
    module.exports = router;