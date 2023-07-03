const {Sequelize} = require('sequelize')
const createDB = new Sequelize("url-db", "user", "pass", {
  dialect: "sqlite",
  host:"./config/URL_DB.sqlite"
})

module.exports=createDB

