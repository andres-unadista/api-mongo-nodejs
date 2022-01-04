const { MongoClient } = require('mongodb')
const debug = require('debug')('app:module-database')

const { Config } = require('../config/index');

let connection = null;

module.exports.Database = (collection) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        const client = new MongoClient(Config.mongoURI);
        connection = await client.connect();
        debug('New connection!');
      } else {
        debug('Reuse connection!');
      }
      const db = connection.db(Config.mongoDatabase)
      resolve(db.collection(collection))
    } catch (error) {
      reject(error)
    }
  })
}