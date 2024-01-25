require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');



class ConexionSequilze {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    }

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }
    desconectar = () => {
        process.on('SIGINT', () => conn.close())
    }
    checkLogin = async (email) => {

        this.conectar();
        let user = await models.User.findOne(({
            where: {
                email
            }
        }));

        this.desconectar();
        if (!user) {
            throw new Error('Email no registrado');
        }

        return user;
    }

    getAllUser = async () => {
        let resultado = [];
        this.conectar();
        console.log(`Accediendo a los datos...`)
        resultado = await models.User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email']
        });
        this.desconectar();
        return resultado;
    }

    getUser = async (dni) => {
        let resultado = [];
        this.conectar();
        resultado = await models.User.findByPk(dni, {
            attributes: ['id', 'first_name', 'last_name', 'email']
        });
        this.desconectar();
        if (!resultado) {
            throw error;
        }
        return resultado;
    }

    insertUser = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const password = await bcrypt.hash(body.password, 10);
            const usuarioNuevo = new models.User(body);
            usuarioNuevo.password = password
            await usuarioNuevo.save();
            // const usuarioNuevo = await models.User.create(body)
            resultado = usuarioNuevo.id; // Asume que la inserción fue exitosa
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${body.id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }


    updateUserPassword = async (id, pwd) => {
        this.conectar();
        let user = await models.User.findByPk(id);
        let resultado = 0
        try {

            if (!user) {
                this.desconectar();
                throw error;
            }

            console.log(user)
            let password = await bcrypt.hash(pwd, 10)
            user.password = password
            user.save()
            resultado = 1

        } catch (err) {
            console.log(err)
        } finally {

            this.desconectar();
        }
        return resultado;
    }

    deleteUser = async (dni) => {
        this.conectar();
        let resultado = await models.User.findByPk(dni);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.desconectar();
        return resultado;
    }
    getAllTask = async () => {
        let resultado = [];
        this.conectar();

        resultado = await models.Task.findAll();
        this.desconectar();
        return resultado;
    }
    getTaskByStatus = async (status) => {
        let resultado = [];
        this.conectar();
        resultado = await models.Task.findAll({
            where: {
                done: status
            }
        })
        this.desconectar();
        return resultado;
    }
    getAllAvailableTask = async () => {
        let resultado = [];
        this.conectar();

        resultado = await models.Task.findAll(({
            where: {
                assignment: null
            }
        }));
        console.log('llega')
        console.log(resultado)
        this.desconectar();
        return resultado;
    }
    getTask = async (id) => {
        let resultado = [];
        this.conectar();
        resultado = await models.Task.findByPk(id);
        this.desconectar();
        if (!resultado) {
            throw error;
        }
        return resultado;
    }


    insertTask = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const task = new models.Task(body);
            await task.save();

            resultado = 1;
        } catch (error) {

            console.log('Ocurrió un error desconocido: ', error);

            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    deleteTask = async (id) => {
        this.conectar();
        let resultado = await models.Task.findByPk(id);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.desconectar();
        return resultado;
    }
    updateTaskStatus = async (id) => {
        let resultado = 0
        try {
            this.conectar();
            let task = await models.Task.findByPk(id);
            if (task.done == true) {

                task.done = false
            } else {
                task.done = true
            }
            await task.save()
            this.desconectar()
        } catch (error) {
            console.log(error)
            throw error
        }
        return resultado
    }
    updateTaskProgress = async (id, progress) => {
        let resultado = 0
        try {
            console.log(progress)
            this.conectar();
            let task = await models.Task.findByPk(id);
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
     
            this.conectar();
            let task = await models.Task.findByPk(id);
           await task.update(body)
        
        return resultado
    }
    updateTaskTime = async (id, time) => {
        let resultado = 0
        try {
            this.conectar();
            let task = await models.Task.findByPk(id);
            task.time_dedicated += time

            await task.save()

        } catch (error) {

            console.log(error)
            throw error
        }
        return resultado
    }
    updateTaskAssignment = async (id, assignment) => {
        let resultado = 0
        try {
            this.conectar();
            let task = await models.Task.findByPk(id);
            task.assignment = assignment
            await task.save()

        } catch (error) {

            console.log(error)
            throw error
        }
        return resultado
    }
    getAllRol = async () => {
        let resultado = [];
        this.conectar();
        resultado = await models.Rol.findAll();
        this.desconectar();
        return resultado;
    }
    getRol = async (id) => {
        try {

            let resultado = [];
            this.conectar();
            resultado = await models.Rol.findByPk(id);
            this.desconectar();

            return resultado;
        } catch (err) {
            console.log(err)
            this.desconectar();
        }
    }
    insertAssignedRol = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const rol = new models.AssignedRol(body);
            await rol.save();
            resultado = 1;
        } catch (error) {
            console.log('Ocurrió un error desconocido: ', error);
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }
    deleteAssignedRol = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const rol = await models.AssignedRol.findOne(({
                where: {
                    id_rol: body.id_rol,
                    id_user: body.id_user
                }
            }));
            await rol.destroy();
            resultado = 1;
        } catch (error) {
            console.log('Ocurrió un error desconocido: ', error);
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }
    getRolesAsignados = async () => {
        let resultado = [];
        this.conectar();
        resultado = await models.AssignedRol.findAll();
        this.desconectar();
        return resultado;
    }
    updateRol = async (id, description) => {
        let resultado = 0
        try {
            this.conectar();
            let task = await models.Rol.findByPk(id);
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
        this.conectar();
        try {
            const rol = new models.Rol();
            rol.description = body.description
            console.log(body.description)
            await rol.save();

            resultado = 1;
        } catch (error) {
            console.log('Ocurrió un error desconocido: ', error);
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }
    deleteRol = async (id) => {
        let resultado = [];
        this.conectar();
        let rol = await models.Rol.findByPk(id);
        await rol.destroy()
        this.desconectar();
        return resultado;
    }
    getRolUserId = async (idU) => {
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
            this.desconectar();
            return resultado;
        } catch (err) {
            console.log(err)
            this.desconectar()
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

module.exports = ConexionSequilze;