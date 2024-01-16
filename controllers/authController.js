const {response,request} = require('express');
const Conexion = require('../database/Conexion');
const {generarJWT} = require('../helpers/generate_jwt')


const login =  (req, res = response) => {
    const {DNI, Clave} = req.body;
    try{
        //Verificar si existe el usuario.
        const conx = new Conexion();
        u = conx.getUsuarioRegistrado(DNI, Clave)    
            .then( usu => {
                console.log('Usuario correcto!  ' + usu[0].DNI);
                const token = generarJWT(usu[0].DNI)
                console.log(usu)
                console.log(token);
                res.status(200).json({usu, token});
            })
            .catch( err => {
                console.log('No hay registro de ese usuario.');
                res.status(500).json({'msg':'Login incorrecto.'});
            });
            

        //res.status(200).json({'msg':'Login ok', DNI, Clave});
    }
    catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error en el servidor.'});
    }
    
}


module.exports = {
    login
}