const { ObjectId } = require("mongodb");
const { Database } = require("../database")
const { ReportUtils } = require("./utils")

const COLLECTION = 'products'

const getProducts = async () => {
  const collection = await Database(COLLECTION)
  return await collection.find({}).toArray();
}

const getProductById = async (id) => {
  const collection = await Database(COLLECTION)
  return await collection.findOne({ _id: ObjectId(id) });
}

const createProduct = async (product) => {
  const collection = await Database(COLLECTION)
  let result = await collection.insertOne(product)
  return result.insertedId
}

const generateReport = async (name, res) => {
  const products = await getProducts();
  ReportUtils.excelReport(products, name, res)
}

const updateProduct = async (id, body) => {
  const collection = await Database(COLLECTION)
  const filter = { _id: ObjectId(id) }
  const options = { upsert: false }
  const updateDoc = {
    $set: {
      name: body.name,
      alias: body.alias,
    }
  }
  const result = await collection.update(filter, [updateDoc], options)
  return result;
}

const removeProduct = async (id) => {
  const collection = await Database(COLLECTION)
  const filter = { _id: ObjectId(id) }

  const result = await collection.deleteOne(filter);
  if (result.deletedCount === 1) {
    return { msg: 'The record was deleted' }
  } else {
    return { msg: 'The record was not deleted' }
  }
}


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  generateReport,
  updateProduct,
  removeProduct
}