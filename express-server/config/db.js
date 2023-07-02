const { Sequelize } = require("sequelize")
const createDb = new Sequelize("myUsersDb", "username", "password", {
  host:"./config/usersDB.sqlite",
  dialect:"sqlite"
})

module.exports =createDb
