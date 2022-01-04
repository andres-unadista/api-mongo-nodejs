const debug = require('debug')('app:module-products-controller')
const createError = require('http-errors')

const { getProducts, getProductById, createProduct, generateReport, updateProduct, removeProduct } = require('./service')
const { Response } = require('../common/response')

module.exports.ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await getProducts();
      Response.success(res, 200, 'List of products', products)
    } catch (error) {
      debug(error)
      Response.error(res)
      Response.error(res)
    }
  },
  getProduct: async (req, res) => {
    try {
      const { params: { id } } = req;
      const product = await getProductById(id);
      if (!product) {
        Response.error(res, new createError.NotFound)
        return;
      }
      Response.success(res, 200, 'Product', product)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.UnprocessableEntity)
        return;
      }
      const product = await createProduct(body);
      Response.success(res, 200, 'Product created', { id: product })
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  generateReport: async (req, res) => {
    try {
      generateReport('Reporte', res)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { body } = req;
      const { params: { id } } = req;
      const product = await getProductById(id);
      if (!product) {
        Response.error(res, new createError.NotFound)
        return;
      }

      const response = await updateProduct(id, body);
      Response.success(res, 200, 'Product updated!', response)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  removeProduct: async (req, res) => {
    try {
      const { params: { id } } = req;
      const product = await getProductById(id);
      if (!product) {
        Response.error(res, new createError.NotFound)
        return;
      }

      const response = await removeProduct(id)
      Response.success(res, 200, 'Product removed!', response)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
}