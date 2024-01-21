const Conexion = require('../database/Conexion');
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

const dniExiste = (dni = '') => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion();
      conx.dniExisteValidator(dni)
        .then(msg => {
          console.log('Existe');
          resolve(true);
        })
        .catch(err => {
          console.log('No existe');
          reject(new Error('DNI existe'));
        });
    });
   };

const edadCorrecta = async(edad)=>{
    if (edad <0){
        throw new Error('Edad incorrecta');
    }
}


module.exports = {
    dniExiste,
    edadCorrecta
}

