require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');

class ConexionSequilze {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect:process.env.DB_DIALECT,
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

    getlistado = async() => {
        let resultado = [];
        this.conectar();
        console.log(`Accediendo a los datos...`)
        resultado = await models.User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email']
          });
        this.desconectar();
        return resultado;
    }

    getUsuario = async(dni) => {
        let resultado = [];
        this.conectar();
        resultado = await models.User.findByPk(dni);
        this.desconectar();
        if (!resultado){
            throw error;
        }
        return resultado;
    }

    registrarUsuario = async(body) => {
        let resultado = 0;
        this.conectar();
        try{
            // const usuarioNuevo = new Persona(body); //Con esto añade los timeStamps.
            // await usuarioNuevo.save();
            const usuarioNuevo = await models.User.create(body);
            resultado = 1; // Asume que la inserción fue exitosa
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

    modificarUsuario = async(dni, body) => {
        this.conectar();
        let resultado = await models.User.findByPk(dni);
        if (!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.update(body);
        this.desconectar();
        return resultado;
    }

    borrarUsuario = async(dni) => {
        this.conectar();
        let resultado = await models.User.findByPk(dni);
        if (!resultado){
            this.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.desconectar();
        return resultado;
    }



    getComments = async() => {
        let resultado = [];
        this.conectar();
        resultado = await models.Comment.findAll();
        this.desconectar();
        return resultado;
    }

    getCommentsId = async(idU) => {
        let resultado = [];
        this.conectar();
        console.log(idU)
        resultado = await models.User.findAll({ 
            where: { id: { [Op.eq]: idU } },
            include: [{
              model: models.Comment,
              as: 'commentsUser'
            }],
            attributes: ['id', 'firstName', 'lastName', 'email']
           });
        this.desconectar();
        return resultado;
    }
}

module.exports = ConexionSequilze;
