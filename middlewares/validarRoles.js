const {response,request} = require('express');
const Conexion = require('../database/ConexionSequelize');

const esAdmin = (req, res, next) => {
    if (!req.uid){ 
        return res.status(500).json({'msg':'No es posible el acceso como administrador.'})
    }
    let con=new Conexion()
     con.userCan(req.uid,1)
     .then(msg=>{
        if(msg==1){
            next()
        }else{
            return res.status(500).json('Acceso no autorizado')
        }

     })
     .catch(err=>{
        console.log(err)
     })
}

module.exports = {
    esAdmin
}