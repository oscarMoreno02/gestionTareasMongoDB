const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.apiPath = '/api';
        this.middlewares();
        this.routes();
        
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.apiPath , require('../routes/routes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor e/home/daw201/Escritorio/servidor/NODEJS/Migrations/appscuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;