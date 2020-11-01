const mongoose = require('mongoose');
const CONFIG = require('./config');
//https://ed.team/comunidad/por-si-les-sale-el-siguiente-advertencia-en-la-conexion-mongodb
//https://mongoosejs.com/docs/deprecations.html

//https://www.developerro.com/2019/03/12/jwt-api-authentication/
//https://enmilocalfunciona.io/construyendo-una-web-api-rest-segura-con-json-web-token-en-net-parte-i/
//https://blog.ezteven.com/tech/2019/05/30/utiliza-jwt-con-laravel-para-apis.html

//retrofit refresh token 
//https://www.woolha.com/tutorials/android-retrofit-2-refresh-access-token-with-okhttpclient-and-authenticator

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