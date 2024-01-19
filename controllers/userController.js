
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
const removeUserRol=(req,res= response)=>{
    const conexion= new Conexion()
    conexion.deleteAssignedRol(req.body.id_user,req.body.id_rol)
    .then(msg=>{
        console.log('Exito en la eliminacion')
        res.status(202).json(msg)
    })
    .catch(err=>{
        console.log('Error en la eliminacion')
        res.status(203).json(err)
    })
}
const addUserRol=(req,res = response)=>{
    const conexion= new Conexion()
    conexion.insertAssignedRol(req.body.id_user,req.body.id_rol)
    .then(msg=>{
        console.log('Rol asignado correctamente')
        res.status(201).json(msg)
    })
    .catch(err=>{
        console.log('Error en la asignacion')
        res.status(203).json(err)
    })
}
module.exports={
 allUser,
 uniqueUser,
 editUserPassword,
 removeUser,
 insertUser,
 removeUserRol,
 addUserRol
}