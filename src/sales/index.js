const express = require('express')
const router = express.Router();

const { SaleController } = require('./controller')

module.exports.SalesAPI = (app) => {
  router
    .get('/', SaleController.getSales)
    .get('/report', SaleController.generateReport)
    .get('/:id', SaleController.getSale)
    .post('/', SaleController.createSale)
  app.use('/api/sales', router)
}