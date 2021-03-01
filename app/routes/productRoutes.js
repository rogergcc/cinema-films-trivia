const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.post('/',

  productController.createProduct
)

router.get('/:id',

  productController.getProductById
)

router.put('/:id',

  productController.updateProduct
)

router.get('/',

  productController.getAllProducts
)

module.exports = router
