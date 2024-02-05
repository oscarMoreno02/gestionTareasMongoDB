const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')
mongoose.set('strictQuery', false);

class Server {
    constructor() {
        this.app = express();
        this.apiPath = '/api';
        this.middlewares();
        this.routes();
        this.conectarMongoose()
        
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
    conectarMongoose() {
        mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {console.log('Conexión exitosa a MongoDB');});
    }
}

module.exports = Server;