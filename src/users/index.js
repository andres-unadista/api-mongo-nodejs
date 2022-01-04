const express = require('express')
const router = express.Router();

const { UserController } = require('./controller')

module.exports.UserAPI = (app) => {
  router
    .get('/', UserController.getUsers)
    .get('/report', UserController.generateReport)
    .get('/:id', UserController.getUser)
    .post('/', UserController.createUser)
    .put('/:id', UserController.updateUser)
    .delete('/:id', UserController.removeUser)
  app.use('/api/users', router)
}