const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {
    
    console.log("UID:" + uid)
    let token = jwt.sign({ uid }, process.env.TOKENKEYWORD, {
      });
    return token;
}

module.exports ={
    generarJWT
}
