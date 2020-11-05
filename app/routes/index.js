const express = require('express');
const router = express.Router();

// Controladores
const homeController = require('../controllers/homeController');
const nosotrosController = require('../controllers/nosotrosController')
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController');

module.exports = function(){
    router.get('/', homeController.consultasHomePage);
    
    router.get('/nosotros', nosotrosController.infoNosotros);

    router.get('/viajes', viajesController.mostrarViajes);
    router.get('/viajes/:id', viajesController.mostrarViaje);

    router.get('/testimoniales', testimonialesController.mostrarTestimoniales);
    router.post('/testimoniales', testimonialesController.guardarTestimonial);

    return router;
}