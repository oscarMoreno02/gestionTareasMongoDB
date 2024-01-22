
const {response,request} = require('express');
const Conexion = require('../database/ConexionSequelize');
const bcrypt = require('bcrypt');
const allUser=(req ,res = response)=>{
    const conexion= new Conexion()
    conexion.getAllUser()
    .then(msg =>{
        console.log('Listado encontrado')
        res.status(200).json(msg)
    })
    .catch(err =>{
        console.log('No se encontraron resultados')
        res.status(200).json({'msg':'No se encontraron tareas'})
    })
}

const uniqueUser=(req,res = response)=>{
    const conexion= new Conexion()
    conexion.getUser(req.params.id)
    .then(msg=>{
        console.log('Persona encontrada')
        res.status(200).json(msg)

    })
    .catch(err=>{
        console.log(err)
        console.log('Error al encontrar la persona')
        res.status(200).json({'msg':'No exite una persona con ese DNI'})
    })
}

const editUserPassword=(req,res= response)=>{
    const conexion= new Conexion()
    conexion.updateUserPassword(req.params.id,req.body.password)
    .then(msg=>{
        console.log('Actualizaddo correctamente')
        res.status(202).json('Actualizado correctamente')
    })
    .catch( err => {
        console.log(err);
        res.status(203).json('Error al actualizar')
    });
}

const insertUser=(req,res = response)=>{
    const conexion= new Conexion()
    conexion.insertUser(req.body)
    .then(msg=>{
        console.log('Persona registrada correctamente')
        res.status(201).json(msg)
    })
    .catch(err=>{
        console.log('Error en el registro')
        res.status(203).json(err)
    })
}

const removeUser=(req,res= response)=>{
    const conexion= new Conexion()
    conexion.deleteUser(req.params.id)
    .then(msg=>{
        console.log('Exito en la eliminacion')
        res.status(202).json(msg)
    })
    .catch(err=>{
        console.log('Error en la eliminacion')
        res.status(203).json(err)
    })
}
const removeRolToUser=(req,res= response)=>{
    console.log('llega')
    const conexion= new Conexion()
    conexion.deleteAssignedRol(req.body)
    .then(msg=>{
        console.log('Exito en la eliminacion')
        res.status(202).json(msg)
    })
    .catch(err=>{
        console.log(err)
        console.log('Error en la eliminacion')
        res.status(203).json(err)
    })
}
const addRolToUser=(req,res = response)=>{
    const conexion= new Conexion()
    conexion.insertAssignedRol(req.body)
    .then(msg=>{
        console.log('Rol asignado correctamente')
        res.status(201).json(msg)
    })
    .catch(err=>{
        console.log('Error en la asignacion')
        res.status(203).json(err)
    })
}
const ranking=(req ,res = response)=>{
    const conexion= new Conexion()
    conexion.ranking()
    .then(msg =>{
        console.log(msg)
        res.status(200).json({ranking:[msg[0]]})
    })
    .catch(err =>{
        console.log('No se encontraron resultados')
        res.status(200).json({'msg':'No se encontraron tareas'})
    })
}
const updatePassword=(req,res= response)=>{
    const conexion= new Conexion()
    conexion.updateUserPassword(req.uid,req.body.password)
    .then(msg=>{
        console.log('Actualizaddo correctamente')
        res.status(202).json('Actualizado correctamente')
    })
    .catch( err => {
        console.log(err);
        res.status(203).json('Error al actualizar')
    });
}


module.exports={
 allUser,
 uniqueUser,
 editUserPassword,
 removeUser,
 insertUser,
 addRolToUser,
 removeRolToUser,
 ranking,
 updatePassword
}