const {response,request} = require('express');
const Conexion = require('../database/ConexionSequelize');
const {generarJWT} = require('../helpers/generate_jwt')
const bcrypt = require('bcrypt');

const login =  (req, res = response) => {
    const {email, password} = req.body;
    try{
        const conx = new Conexion();
        u = conx.getUsuarioRegistrado(email)    
            .then( usu => {
                console.log(usu.password)
                bcrypt.compare(password, usu.password, (err, result) => {
                    if (result) {
                        const token = generarJWT(usu.email)
                        res.status(200).json({usu, token});
                    } else {
                        
                        res.status(500).json({'msg':'La contraseña no es válida.'});
                    }
                 })
                 ;

            })
            .catch( err => {
                res.status(500).json({'msg':'Login incorrecto.'});
            });
    }
    catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error en el servidor.'});
    }
    
}


module.exports = {
    login
}