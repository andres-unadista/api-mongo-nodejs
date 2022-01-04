const { ObjectId } = require("mongodb");
const { Database } = require("../database")
const { ReportUtils } = require("./utils")

const COLLECTION = 'users'

const getUsers = async () => {
  const collection = await Database(COLLECTION)
  return await collection.find({}).toArray();
}

const getUserById = async (id) => {
  const collection = await Database(COLLECTION)
  return await collection.findOne({ _id: ObjectId(id) });
}

const createUser = async (user) => {
  const collection = await Database(COLLECTION)
  let result = await collection.insertOne(user)
  return result.insertedId
}

const generateReport = async (name, res) => {
  const users = await getUsers();
  ReportUtils.excelReport(users, name, res)
}

const updateUser = async (id, body) => {
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

const removeUser = async (id) => {
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
  getUsers,
  getUserById,
  createUser,
  generateReport,
  updateUser,
  removeUser
}