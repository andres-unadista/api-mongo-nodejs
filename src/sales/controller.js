const debug = require('debug')('app:module-user-controller')
const createError = require('http-errors')

const { getSales, getSaleById, createSale, generateReport } = require('./service')
const { Response } = require('../common/response')

module.exports.SaleController = {
  getSales: async (req, res) => {
    try {
      const sales = await getSales();
      Response.success(res, 200, 'List of sales', sales)
    } catch (error) {
      debug(error)
      Response.error(res)
      Response.error(res)
    }
  },
  getSale: async (req, res) => {
    try {
      const { params: { id } } = req;
      const sale = await getSaleById(id);
      if (!sale) {
        Response.error(res, new createError.NotFound)
        return;
      }
      Response.success(res, 200, 'sale', sale)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  createSale: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length !== 2) {
        Response.error(res, new createError.UnprocessableEntity)
        return;
      }
      const sale = await createSale(body);
      Response.success(res, 200, 'sale created', { id: sale })
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  generateReport: async (req, res) => {
    try {
      generateReport('Sale', res)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
}