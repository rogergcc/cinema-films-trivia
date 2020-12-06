const mongoose = require('mongoose');
const CONFIG = require('./config');
// const options = {
//     keepAlive: 1,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   };
module.exports = {
    connection: null,
    connect: function(){
        if(this.connection) return this.connection;
       
        return mongoose
            //.connect(CONFIG.DB)
            
            .set("useCreateIndex", true)
            .connect(CONFIG.DB, { 
                useNewUrlParser: true ,
                useUnifiedTopology: true    
            })

            //.connect(process.env.URL_DB, { useNewUrlParser: true })   
            .then(connection => {
                this.connection = connection;
                console.log('Conexion a Base de Datos Exitosa');
            }).catch(error => console.log(error));
    }
}