"use strict";
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CONFIG = require('./config/config');
const App = require('./app/app');


App.listen(CONFIG.PORT,function(error){
  if(error) return console.log(error);
  console.log(`Servidor corriendo en el Puerto: ${CONFIG.HOST}:${CONFIG.PORT}`);
  console.log(`My list Movies json: ${CONFIG.HOST}:${CONFIG.PORT}/api/v1/getMovies`);
  
});
