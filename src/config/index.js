require('dotenv').config()

module.exports.Config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  mongoDatabase: process.env.MONGO_DATABASE,
}