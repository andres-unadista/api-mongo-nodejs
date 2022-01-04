const express = require('express');
const debug = require('debug')('app:main');
const { Config } = require('./src/config/index');
const { ProductAPI } = require('./src/products');
const { SalesAPI } = require('./src/sales');
const { UserAPI } = require('./src/users');
const { IndexAPI, NotFoundAPI } = require('./src/home/index');

const app = express();

app.use(express.json());

IndexAPI(app);
ProductAPI(app);
UserAPI(app);
SalesAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () => {
  debug(`Server listening on port ${Config.port}`);
});
