const { ObjectId } = require('mongodb');
const { Database } = require('../database');
const { ReportUtils } = require('./utils');

const COLLECTION = 'sales';

const getSales = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getSaleById = async (id) => {
  const salesCollection = await Database(COLLECTION);
  const productsCollection = await Database('products');
  const usersCollection = await Database('users');

  const sale = await salesCollection.findOne({ _id: ObjectId(id) });
  let products = [];
  for (const product of sale.products) {
    const dataProduct = await productsCollection.findOne({
      _id: ObjectId(product.id_product),
    });
    products.push(dataProduct);
  }
  const user = await usersCollection.findOne({ _id: ObjectId(sale.id_user) });
  const fullData = [{ sale }, { products }, { user }];
  return fullData;
};

const createSale = async (sale) => {
  const collection = await Database(COLLECTION);
  const productsCollection = await Database('products');
  let products = [];
  let date = new Date();

  for (const product of sale.products) {
    const dataProduct = await productsCollection.findOne({
      _id: ObjectId(product.id_product),
    });
    products.push(+product.quantity * +dataProduct.value);
  }

  sale.total = products.reduce((prev, current) => prev + current);
  sale.dateCurrent =
    date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();

  let result = await collection.insertOne(sale);
  return result.insertedId;
};

const generateReport = async (name, res) => {
  const sales = await getSales();
  ReportUtils.excelReport(sales, name, res);
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  generateReport,
};
