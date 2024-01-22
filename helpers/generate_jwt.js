const jwt = require('jsonwebtoken')


const generarJWT = (uid,abilities) => {
    
    console.log("UID:" + uid)
    let token = jwt.sign({ uid, abilities }, process.env.TOKENKEYWORD, {
      });
    return token;
}

module.exports ={
    generarJWT
}
