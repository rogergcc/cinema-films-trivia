const express = require('express');
const router = express.Router();

// Controladores
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController')


module.exports = function(){
    router.get('/', homeController.getDataHomePage);
    
    router.get('/about', aboutController.infoAbout);

    return router;
}