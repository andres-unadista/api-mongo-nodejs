const express = require('express');
const { Response } = require('../common/response');
const error = require('http-errors');

module.exports.IndexAPI = (app) => {
  const router = express.Router();
  router.get('/', (req, res) => {
    const menu = {
      products: `https://${req.headers.host}/api/products`,
      users: `https://${req.headers.host}/api/users`,
    };
    Response.success(res, 200, 'API paths', menu);
  });
  app.use('/', router);
};

module.exports.NotFoundAPI = (app) => {
  const router = express.Router();
  router.get('*', (req, res) => {
    Response.error(res, new error.NotFound());
  });
  app.use('/', router);
};
