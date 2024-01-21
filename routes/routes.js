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
const { check } = require('express-validator');
const {validateValues}=require('../middlewares/validar-campos')
const { emailExist,timeCorrect, userExist, taskExist, rolExist} = require('../helpers/db-validators');

router.put('/login',authController.login)
router.post('/register',
[
    check('email').custom( emailExist),
    check('first_name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    validateValues

 ],
authController.register)

router.group('/task',(router)=>{

    router.get('/availables',authMid.validarJWT,taskController.allAvailableTask)
    router.get('',authMid.validarJWT,taskController.allTask)
    router.get('/:id',authMid.validarJWT,taskController.uniqueTask)

    router.post('',
    [
        check('description', 'La descripcion es obligatoria').not().isEmpty(),
        check('difficulty', 'La dificultad es obligatoria').not().isEmpty(),
        check('difficulty', 'Dificultad incorrecta').isIn(['s','m','l','xl']),
        check('time_estimated', 'El tiempo estimado es obligatorio').not().isEmpty(),
        check('time_estimated','El tiempo estimado no es correcto').isInt(),
        check('time_estimated').custom(timeCorrect),
        validateValues

     ],
    authMid.validarJWT,rolMid.esAdmin,taskController.insertTask)

    router.put('/status/:id',   
    [
        check('status', 'El estado es obligatorio').not().isEmpty(),
        check('status','El estado no es correcto').isInt(),
        check('status').custom(timeCorrect),
        validateValues

     ],authMid.validarJWT,rolMid.esAdmin,taskController.editTaskStatus)

    router.put('/progress/:id', 
        [
            check('progress', 'El progreso es obligatorio').not().isEmpty(),
            check('progress','El progreso no es correcto').isInt(),
            check('progress').custom(timeCorrect),
            validateValues

         ],authMid.validarJWT,rolMid.esAdmin,taskController.editTaskProgress)

    router.put('/time/:id',  
    [
        check('time', 'El tiempo es obligatorio').not().isEmpty(),
        check('time','El tiempo no es correcto').isInt(),
        check('time').custom(timeCorrect),
        validateValues

     ],authMid.validarJWT,rolMid.esAdmin,taskController.addTaskTime)

    router.delete('/:id',authMid.validarJWT,rolMid.esAdmin,taskController.removeTask)
    
    router.group('/assignment',(router)=>{
        router.put('/add/:id',
        [
            check('assignment', 'El id de usuario es obligatorio').not().isEmpty(),
            check('assignment').custom(userExist),
            validateValues

         ],
         authMid.validarJWT,rolMid.esAdmin,taskController.editTaskAssignment)

        router.put('/remove/:id',taskMid.isAssigned,authMid.validarJWT,rolMid.esAdmin,taskController.dropTaskAssignment)

    })

})
router.group('/user',(router)=>{
    router.put('',  
    [
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        validateValues
    
     ],authMid.validarJWT,userController.updatePassword)

    router.group('/rol',(router)=>{

        router.get('',authMid.validarJWT,rolMid.esAdmin,rolController.getRolOfAllUser)
        router.get('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.getRolOfUser)

        router.post('',
        [
            check('id_rol', 'El id del rol es obligatorio').not().isEmpty(),
            check('id_user', 'El id del usuario es obligatorio').not().isEmpty(),
            check('id_user').custom(userExist),
            check('id_rol').custom(rolExist),
            validateValues

         ],authMid.validarJWT,rolMid.esAdmin,userController.addRolToUser)

        router.delete('',authMid.validarJWT,rolMid.esAdmin,userController.removeRolToUser)

    })
    router.group('/task',(router)=>{
        
        router.put('/progress/:id',
        [
            check('progress', 'El progreso es obligatorio').not().isEmpty(),
            check('progress','El progreso no es correcto').isInt(),
            check('progress').custom(timeCorrect),
            validateValues

         ],authMid.validarJWT,taskMid.checkAssignment,taskController.editTaskProgress)

        router.put('/status/:id',   
        [
            check('status', 'El estado es obligatorio').not().isEmpty(),
            check('status','El estado no es correcto').isInt(),
            check('status').custom(timeCorrect),
            validateValues

         ],authMid.validarJWT,taskMid.checkAssignment,taskController.editTaskStatus)


        router.put('/time/:id', 
        [
            check('time', 'El tiempo es obligatorio').not().isEmpty(),
            check('time','El tiempo no es correcto').isInt(),
            check('time').custom(timeCorrect),
            validateValues

         ],authMid.validarJWT,taskMid.checkAssignment,taskController.addTaskTime)

        router.put('/pick/:id',authMid.validarJWT,taskMid.isAvailable,taskController.editTaskAssignment)
        router.get('/ranking',authMid.validarJWT,rolMid.esAdmin,userController.ranking)
    })

    router.get('',authMid.validarJWT,rolMid.esAdmin,userController.allUser)
    router.get('/:id',authMid.validarJWT,rolMid.esAdmin,userController.uniqueUser)

    router.post('',
    [
        check('email').custom( emailExist),
        check('first_name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        check('email', 'El correo no es válido').isEmail(),
        validateValues
    
     ],authMid.validarJWT,rolMid.esAdmin,userController.insertUser)

    router.put('/:id',
    [
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        validateValues
    
     ],authMid.validarJWT,rolMid.esAdmin,userController.editUserPassword)

    router.delete('/:id',authMid.validarJWT,rolMid.esAdmin,userController.removeUser)

})

router.group('/rol',(router)=>{

    router.get('',authMid.validarJWT,rolMid.esAdmin,rolController.allRol)
    router.get('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.uniqueRol)
    router.post('',authMid.validarJWT,rolMid.esAdmin,rolController.newRol)

    router.put('/:id',
    [
        check('description', 'El nombre es obligatorio').not().isEmpty(),
        validateValues
    
     ],authMid.validarJWT,rolMid.esAdmin,rolController.editRolDescription)

    router.delete('/:id',authMid.validarJWT,rolMid.esAdmin,rolController.removeRol)

})

    module.exports = router;