const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {
    
    console.log("UID:" + uid)
    let token = jwt.sign({ uid }, process.env.TOKENKEYWORD, {
        expiresIn: '4h' 
      });
    return token;
}

module.exports ={
    generarJWT
}
