const {response,request} = require('express');
const Conexion = require('../database/ConexionSequelize');

const isAvailable=(req,res,next)=>{
    const conexion= new Conexion()
    console.log(req.params.id)
    conexion.getTask(req.params.id)
    .then(data=>{
            if(data.assignment==null){
                next()
            }else{
                res.status(400).json('Tarea ya asignada')
            }
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({msg:'No exite una tarea con ese id'})
    })
}
const isAssigned=(req,res,next)=>{
    const conexion= new Conexion()
    console.log(req.params.id)
    conexion.getTask(req.params.id)
    .then(data=>{
            if(data.assignment!=null){
                next()
            }else{
                res.status(400).json('Tarea sin asignacion')
            }
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({msg:'No exite una tarea con ese id'})
    })
}
const checkAssignment=(req,res,next)=>{
    const conexion= new Conexion()
    console.log(req.params.id)
    conexion.getTask(req.params.id)
    .then(data=>{
            if(data.assignment==req.uid){
               next()
            }else{
                res.status(401).json('Acceso restringido')
            }
    })
    .catch(err=>{
        console.log(err)
        res.status(200).json({msg:'No exite una tarea con ese id'})
    })
}
module.exports={
    isAvailable,
    checkAssignment,
    isAssigned
}