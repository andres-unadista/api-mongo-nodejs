const debug = require('debug')('app:module-user-controller')
const createError = require('http-errors')

const { getUsers, getUserById, createUser, generateReport, updateUser, removeUser } = require('./service')
const { Response } = require('../common/response')

module.exports.UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await getUsers();
      Response.success(res, 200, 'List of users', users)
    } catch (error) {
      debug(error)
      Response.error(res)
      Response.error(res)
    }
  },
  getUser: async (req, res) => {
    try {
      const { params: { id } } = req;
      const user = await getUserById(id);
      if (!user) {
        Response.error(res, new createError.NotFound)
        return;
      }
      Response.success(res, 200, 'user', user)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.UnprocessableEntity)
        return;
      }
      const user = await createUser(body);
      Response.success(res, 200, 'user created', { id: user })
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
  updateUser: async (req, res) => {
    try {
      const { body } = req;
      const { params: { id } } = req;
      const user = await getUserById(id);
      if (!user) {
        Response.error(res, new createError.NotFound)
        return;
      }

      const response = await updateUser(id, body);
      Response.success(res, 200, 'user updated!', response)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  removeUser: async (req, res) => {
    try {
      const { params: { id } } = req;
      const user = await getUserById(id);
      if (!user) {
        Response.error(res, new createError.NotFound)
        return;
      }

      const response = await removeUser(id)
      Response.success(res, 200, 'user removed!', response)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
}