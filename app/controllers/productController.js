const productService = require('../service/productService')
const constants = require('../constants')

module.exports.createProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse }
  try {
    const productNameExisting = await productService.checkProductNameAlreadyExisting(req.body.name)

    // if product name already exists
    if (productNameExisting) {

      const responseFromService = await productService.updateProduct({
        id: productNameExisting._id,
        updateInfo: req.body
      })

      response.status = 200
      response.message = constants.productMessage.PRODUCT_UPDATED

      response.body = responseFromService

      return res.status(response.status).send(response)
    }

    // IF is a new product
    const responseFromService = await productService.createProduct(req.body)
    response.status = 200
    response.message = constants.productMessage.PRODUCT_CREATED
    response.body = responseFromService
  } catch (error) {
    console.log('Something went wrong: Controller: createProduct', error)
    response.message = error.message
  }
  return res.status(response.status).send(response)
}

module.exports.getAllProducts = async (req, res) => {
  const response = { ...constants.defaultServerResponse }
  try {
    const responseFromService = await productService.getAllProducts(req.query)

    response.body = responseFromService

    if (responseFromService.docs.length == 0) {
      response.message = 'No Content'
      response.status = 200
    } else {
      response.message = constants.productMessage.PRODUCT_FETCHED
      response.status = 200
    }
    response.totalDocsCurrentPage = responseFromService.docs.length
  } catch (error) {
    console.log('Something went wrong: Controller: getAllProducts', error)
    response.message = error.message
  }
  return res.status(response.status).send(response)
}

module.exports.getProductById = async (req, res) => {
  const response = { ...constants.defaultServerResponse }
  try {
    const responseFromService = await productService.getProductById(req.params)
    response.status = 200
    response.message = constants.productMessage.PRODUCT_FETCHED
    response.body = responseFromService
  } catch (error) {
    console.log('Something went wrong: Controller: getProductById', error)
    response.message = error.message
  }
  return res.status(response.status).send(response)
}

module.exports.updateProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse }
  try {
    const responseFromService = await productService.updateProduct({
      id: req.params.id,
      updateInfo: req.body
    })
    response.status = 200
    response.message = constants.productMessage.PRODUCT_UPDATED
    response.body = responseFromService
  } catch (error) {
    console.log('Something went wrong: Controller: updateProduct', error)
    response.message = error.message
  }
  return res.status(response.status).send(response)
}

// module.exports.checkProductExisting = async (req, res) => {
//   let response = { ...constants.defaultServerResponse };
//   try {
//     const responseFromService = await productService.checkProductIdExisting({
//       id: req.params.id,
//       updateInfo: req.body
//     });
//     response.status = 200;
//     response.message = constants.productMessage.PRODUCT_UPDATED;
//     response.body = responseFromService;
//   } catch (error) {
//     console.log('Something went wrong: Controller: updateProduct', error);
//     response.message = error.message;
//   }
//   return res.status(response.status).send(response);
// }
