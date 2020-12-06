const Product = require("../models/productModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

module.exports.createProduct = async (serviceData) => {
  try {
    const product = new Product({ ...serviceData });

    const result = await product.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createProduct", error);
    throw new Error(error);
  }
};

module.exports.getAllProducts = async (req) => {
  try {
    let { page = 1, limit = 10 } = req;
    page = page <= 0 ? 1 : page;

    let products = await Product.paginate({},{page,sort: { price: -1 }})
      // .skip(parseInt((page - 1) * limit))
      // .limit(parseInt(limit*1));
    return (products);
  } catch (error) {
    console.log("Something went wrong: Service: getAllProducts", error);
    throw new Error(error);
  }
};

module.exports.getProductById = async ({ id }) => {
  try {
    checkObjectId(id);
    let product = await Product.findById(id);
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(product);
  } catch (error) {
    console.log("Something went wrong: Service: getProductById", error);
    throw new Error(error);
  }
};

module.exports.updateProduct = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let product = await Product.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(product);
  } catch (error) {
    console.log("Something went wrong: Service: updateProduct", error);
    throw new Error(error);
  }
};

module.exports.checkProductNameAlreadyExisting = async (name) => {
  try {
    //checkObjectId(name);
    const alreadyExisting = await Product.findOne({ name: name });
    // if (!alreadyExisting) {
    //   throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    // }

    return alreadyExisting;
  } catch (error) {
    console.log("Something went wrong: Service: check produdct exist", error);
    throw new Error(error);
  }
};
