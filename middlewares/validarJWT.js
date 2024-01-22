const jwt = require('jsonwebtoken');
const {response, request} = require('express')  //Incorporamos esto aquí porque vamos a añadir elementos a req que sacaremos del token.

const validarJWT = (req , res , next) => { 
    const token = req.header('x-token');  

    if (!token){
        return res.status(401).json({'msg':'No hay token en la petición.'});
    }

    try {
        
        const {uid, abilities} = jwt.verify(token, process.env.TOKENKEYWORD);
        req.uid = uid;
        req.abilities=abilities
        console.log(uid);
        console.log(token);
        next();
        
    }catch(error){
        console.log(error);
        res.status(401).json({'msg':'Token no válido.'});
    }
}

module.exports = {
    validarJWT
}