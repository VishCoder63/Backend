const { Model, DataTypes } = require('sequelize')
const createDB= require('../config/db')

class URLModal extends Model{ }
URLModal.init({
  shortUrl: {
    type: DataTypes.STRING,
    allowNull:false
  },
  longUrl: {
    type: DataTypes.STRING,
    allowNull:false
  }
}, { sequelize: createDB })

module.exports=URLModal