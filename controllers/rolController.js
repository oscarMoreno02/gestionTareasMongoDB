const{response,request}=require('express')
const Conexion = require('../database/ConexionSequelize')


const allRol=(req ,res = response)=>{
    const conexion= new Conexion()
    conexion.getAllRol()
    .then(msg =>{
        console.log('Listado encontrado')
        res.status(200).json(msg)
    })
    .catch(err =>{
        console.log('No se encontraron resultados')
        res.status(200).json({'msg':'No se encontraron tareas'})
    })
}

const uniqueRol=(req,res = response)=>{
    const conexion= new Conexion()
    console.log(req.params.id)
    conexion.getRol(req.params.id)
    .then(msg=>{
        console.log('Rol encontrado')
        res.status(200).json(msg)

    })
    .catch(err=>{
        console.log(err)
        console.log('Error al encontrar el rol')
        res.status(200).json({'msg':'No exite un rol con ese id'})
    })
}

const editRolDescription=(req,res= response)=>{
    const conexion= new Conexion()
    conexion.updateRol(req.params.id,req.body.description)
    .then(msg=>{
        console.log('Actualizado correctamente')
        res.status(202).json(msg)
    })
    .catch( err => {
        console.log('Error al actualizar');
        res.status(203).json(err)
    });
}

const newRol=(req,res = response)=>{
    const conexion= new Conexion()

    conexion.insertRol(req.body)
    .then(msg=>{
        console.log('Rol registrado correctamente')
        res.status(201).json(msg)
    })
    .catch(err=>{
        console.log('Error en el registro')
        res.status(203).json(err)
    })
}

const removeRol=(req,res= response)=>{
    const conexion= new Conexion()
    conexion.deleteRol(req.body)
    .then(msg=>{
        console.log('Exito en la eliminacion')
        res.status(202).json(msg)
    })
    .catch(err=>{
        console.log('Error en la eliminacion')
        res.status(203).json(err)
    })
}
    const getRolOfUser =  (req, res = response) => {
        const conx = new Conexion();
    
        conx.getRolUserId(req.params.id)    
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registros');
                res.status(203).json({'msg':'No se han encontrado registros'});
            });
    }
    const getRolOfAllUser =  (req, res = response) => {
        const conx = new Conexion();
    
        conx.getRolAllUser()    
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registros');
                res.status(203).json({'msg':'No se han encontrado registros'});
            });
    }
module.exports={
allRol,
uniqueRol,
editRolDescription,
removeRol,
newRol,
getRolOfUser,
getRolOfAllUser
}