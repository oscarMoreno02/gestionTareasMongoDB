const {response,request} = require('express');
const Conexion = require('../database/ConexionSequelize');

const CustomError = require('./CustomError')

// const dniExiste = ( dni = '' ) => {

//     const conx = new Conexion();

//     conx.dniExisteValidator(dni)    
//         .then( msg => {
//             console.log('Existe')
//         }).catch( err => {
//             console.log('No existe')
//             throw new Error('DNI existe');
//         });
// }

const emailExist = (email = '') => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion();
      conx.checkLogin(email)
        .then(msg => {
          
          reject(new Error('Email registrado'));
        })
        .catch(err => {
          resolve(true);
        });
    });
   };
   const timeCorrect = async(t)=>{
    if (t <1){
        throw new Error('Cantidad introducida incorrecta');
    }
}

const userExist = (id = '') => {
  return new Promise((resolve, reject) => {
    const conx = new Conexion();
    conx.getUser(id)
      .then(msg => {
        
        resolve(true);
      })
      .catch(err => {
        reject(new Error('ID de usuario no registrado'));
      });
  });
 };
 const taskExist = (id = '') => {
  return new Promise((resolve, reject) => {
    const conx = new Conexion();
    conx.getTask(id)
      .then(msg => {
        
        resolve(true);
      })
      .catch(err => {
        reject(new Error('ID de tarea no registrado'));
      });
  });
 };
 const rolExist = (id = '') => {
  return new Promise((resolve, reject) => {
    const conx = new Conexion();
    conx.getRol(id)
      .then(msg => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error('ID de rol no registrado'));
      });
  });
 };
 
module.exports = {
    emailExist,
  timeCorrect,
  userExist,
  taskExist,
  rolExist
}

