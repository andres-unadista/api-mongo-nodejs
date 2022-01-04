const express = require('express')
const router = express.Router();

const { ProductController } = require('./controller')

module.exports.ProductAPI = (app) => {
  router
    .get('/', ProductController.getProducts)
    .get('/report', ProductController.generateReport)
    .get('/:id', ProductController.getProduct)
    .post('/', ProductController.createProduct)
    .put('/:id', ProductController.updateProduct)
    .delete('/:id', ProductController.removeProduct)
  app.use('/api/products', router)
}