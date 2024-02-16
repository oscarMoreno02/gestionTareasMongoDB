const {response,request} = require('express');
const {ConexionMongo} = require('../database/ConexionMongo');
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/generate_jwt')

const login =  (req, res = response) => {
    const {email, password} = req.body;
    try{
        const conx = new ConexionMongo();
        conx.checkLogin(email)    
            .then( usu => {
                console.log(usu.password)
                bcrypt.compare(password, usu.password, (err, result) => {
                    if (result) {
                        conx.getRolUserId(usu.id)
                        .then(roles=>{
                            let r=[]
                            console.log(roles)
                            for(let i=0;i<roles[0].assigned_rols.length;i++){
                                console.log(roles)
                                r.push(roles[0].assigned_rols[i].description)
                            }
       
                            const token = generarJWT(usu.id,r,usu.first_name)
                            res.status(200).json({token});
                
                        })
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
const register =  (req, res = response) => {
    try{
        const conx = new ConexionMongo();
            conx.insertUser(req.body)    
            .then( usu => {
               
                let data={
                    id_user: usu,
                    id_rol: 2
                }
              
               conx.insertAssignedRol(data) 
                .then(a=>{
                    const token = generarJWT(usu,['programmer'],req.body.first_name)
                    res.status(200).json({msg:'Registro correcto',token});
                })
                .catch(err=>{
                    res.status(400).json({msg:'Usuario registrado sin rol'})
                })
            })
            .catch( err => {
                console.log(err)
                
                res.status(500).json(err);
            });
    }
    catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error en el servidor.'});
    }
    
}


module.exports = {
    login,
    register
}