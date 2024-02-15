const UserModel = require('../models/mongoose/userMongoose')
const AssignedRolModel = require('../models/mongoose/assignedrolMongoose') 
const TaskModel = require('../models/mongoose/taskMongoose')
const RolModel =require('../models/mongoose/rolMongoose')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
class ConexionMongo{
    constructor(){}
    
    insertUser = async (req, res) => {
    try {
        try{
            let ultimo= await UserModel.find().sort({id:-1})
            req.body.id=parseInt(ultimo[0].id+1)
        }
        catch(e){
            req.body.id=1
        }
        req.body.password= await bcrypt.hash(req.body.password, 10);
        await UserModel.create(req.body);
    
        return req.body.id
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ 'msg': 'Error al registrar usuario' });
    }
}
checkLogin = async (e) => {

    let user = await UserModel.findOne({email: e})
    if (!user) {
        throw new Error('Email no registrado');
    }

    return user;
}
getAllUser = async () => {
   
    const resultado = await UserModel.findAll();

    return resultado;
}

getUser = async (id) => {

    const resultado = await UserModel.findOne({ id: id });

    if (!resultado) {
        throw error;
    }
    return resultado;
}




updateUserPassword = async (id, pwd) => {

    const user = await UserModel.findOne({ id: id });

    let resultado = 0
    try {

        if (!user) {
         
            throw error;
        }

        console.log(user)
        let password = await bcrypt.hash(pwd, 10)
        user.password = password
        user.save()
        resultado = 1

    } catch (err) {
        console.log(err)
    } 
    return resultado;
}

deleteUser = async (id) => {

    const resultado = await UserModel.deleteOne({ id: id });
    if (!resultado) {
       
        throw error;
    }
    return resultado;
}
getAllTask = async () => {
    const resultado = await TaskModel.find();
    return resultado;
}
getTaskByStatus = async (status) => {
    const resultado = await TaskModel.find({ done: status });
    return resultado;
}
getAllAvailableTask = async () => {
    const resultado = await TaskModel.find({ assignment: null });
    return resultado;
}
getTask = async (id) => {
    const resultado = await TaskModel.findOne({ id: id });
    if (!resultado) {
        throw error;
    }
    return resultado;
}


insertTask = async (body) => {
    let resultado = 0;
    try {
        await TaskModel.create(body)
        resultado = 1;
    } catch (error) {
        console.log('Ocurrió un error desconocido: ', error);
        throw error;
    }
    return resultado;
}

deleteTask = async (id) => {
    let resultado = await TaskModel.deleteOne({id: id});
    if (!resultado) {

        throw error;
    }

    return resultado;
}
updateTaskStatus = async (id) => {
    let resultado = 0
    try {
        let task = await TaskModel.findOne({ id: id });
        if (task.done == true) {
            task.done = false
        } else {
            task.done = true
        }
        await task.save()
    } catch (error) {
        console.log(error)
        throw error
    }
    return resultado
}
updateTaskProgress = async (id, progress) => {
    let resultado = 0
    try {
        let task = await TaskModel.findOne({ id: id });
        task.progress = progress
        await task.save()
    } catch (error) {

        console.log(error)
        throw error
    }
    return resultado
}
updateFullTask = async (id,body) => {
    let resultado = 0
        let task = await TaskModel.findOne({ id: id });;
       await task.update(body)
    
    return resultado
}
updateTaskTime = async (id, time) => {
    let resultado = 0
    try {
        let task = await TaskModel.findOne({ id: id });;
        task.time_dedicated += time
        await task.save()
    } catch (error) {
        throw error
    }
    return resultado
}
updateTaskAssignment = async (id, assignment) => {
    let resultado = 0
    try {
        let task = await TaskModel.findOne({ id: id });
        task.assignment = assignment
        await task.save()
    } catch (error) {
        throw error
    }
    return resultado
}
getAllRol = async () => {
    let resultado = [];

    resultado = await RolModel.find();
    this.desconectar();
    return resultado;
}
getRol = async (id) => {
    try {
        let resultado = [];
        resultado = await  RolModel.findOne({ id: id });
        return resultado;
    } catch (err) {
        console.log(err)
    }
}
insertAssignedRol = async (body) => {
    let resultado = 0;
    try {
        await AssignedRolModel.create(body);
        resultado = 1;
    } catch (error) {
        console.log('Ocurrió un error desconocido: ', error);
        throw error;
    } 
    return resultado;
}
deleteAssignedRol = async (body) => {
    let resultado = 0
    try {
        const rol = await AssignedRolModel.findOneAndDelete({id_user: body.id_user, id_rol: body.id_rol});
        resultado = 1;
    } catch (error) {
        console.log('Ocurrió un error desconocido: ', error);
        throw error;
    }
    return resultado;
}
getRolesAsignados = async () => {
    let resultado = [];
    resultado = await AssignedRolModel.find();
    this.desconectar();
    return resultado;
}
updateRol = async (id, description) => {
    let resultado = 0
    try {
        let task = await RolModel.findOne({ id: id });
        task.description = description
        await task.save()
    } catch (error) {
        console.log(error)
        throw error
    }
    return resultado
}
insertRol = async (body) => {
    let resultado = 0;
    try {
        try{
            let ultimo= await RolModel.find().sort({id:-1})
            body.id=parseInt(ultimo[0].id+1)
        }
        catch(e){
            body.id=1
        }
        const rol = await RolModel.create(body)

        resultado = 1;
    } catch (error) {
        console.log(error)
        console.log('Ocurrió un error desconocido: ', error);
        throw error;
    } finally {

    }
    return resultado;
}
deleteRol = async (id) => {
    let resultado = [];
    this.conectar();
    let rol = await  RolModel.findOneAndDelete({ id: id });
  
    this.desconectar();
    return resultado;
}
getRolUserId = async (idU) => {
        try {
            const resultado = await UserModel.aggregate([
                { $match: { id: parseInt(idU) } }, // Utilizamos parseInt para asegurarnos de que idU sea un número
                {
                    $lookup: {
                        from: "assignedRols",
                        localField: "id",
                        foreignField: "id_user",
                        as: "assigned_rols"
                    }
                },
                {
                    $unwind: "$assigned_rols"
                },
                {
                    $lookup: {
                        from: "rols",
                        localField: "assigned_rols.id_rol",
                        foreignField: "id",
                        as: "rol"
                    }
                },
                {
                    $unwind: "$rol"
                },
                {
                    $group: {
                        _id: "$_id",
                        first_name: { $first: "$first_name" },
                        last_name: { $first: "$last_name" },
                        email: { $first: "$email" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        assigned_rols: {
                            $push: {
                                id: "$rol.id",
                                description: "$rol.description"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        first_name: 1,
                        last_name: 1,
                        email: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        assigned_rols: 1
                    }
                }
            ]);
    
            return resultado;
        } catch (err) {
            console.log(err);
            throw err;
        }
}
getTaskUserId = async (idU) => {
    try {

        let resultado = [];
        this.conectar();
    
        resultado = await models.User.findAll({
            attributes: ['first_name','last_name','email','createdAt','updatedAt'],
            where: {
                id: {
                    [Op.eq]: idU
                }
            },
            include: [{
                    model: models.Task,
                    as: 'tasks',
                },

            ],
        });
        this.desconectar();
        return resultado;
    } catch (err) {
        console.log(err)
        this.desconectar()
    }
}

getRolAllUser = async (idU) => {
    try {

        let resultado = [];
        this.conectar();
        resultado = await models.User.findAll({
            attributes: ['first_name','last_name','email','createdAt','updatedAt'],
            include: [{
                model: models.AssignedRol,
                as: 'assigned_rols',
                include: [{
                        model: models.Rol,
                        as: 'rol',
                        attributes: ['description'],
                    },

                ],
                attributes: ['id'],
            }, ],
        });
        this.desconectar();
        return resultado;
    } catch (err) {
        console.log(err)
        this.desconectar()
    }
}
getTaskAllUser = async () => {
    try {

        let resultado = [];
        this.conectar();
        resultado = await models.User.findAll({
            attributes: ['first_name','last_name','email','createdAt','updatedAt'],
            include: [{
                    model: models.Task,
                    as: 'tasks',
                },

            ],
        });
  
        return resultado;
    } catch (err) {
        console.log(err)

        
    }
}
ranking=async()=>{
let resultado = [];
try{

    this.conectar();
    
    resultado = await this.db.query
    ('SELECT u.id, u.first_name,u.last_name,u.email, COUNT(t.id) AS tasks_completed '
    +' FROM users u JOIN tasks t ON u.id = t.assignment '
    +' WHERE t.done = 1 GROUP BY u.id, u.first_name ORDER BY tasks_completed DESC; ');
    this.desconectar();
    return resultado;
}catch(e){
    console.log(e)
    return e
}
}
}
module.exports = {
    ConexionMongo
    
};