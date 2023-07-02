const { Model, DataTypes } = require("sequelize")
const createDb = require("../config/db")
class User extends Model { }

User.init(
  {
    name:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING},
    password:{type: DataTypes.STRING},
  },
  {sequelize:createDb,modelName:"user"}
);

module.exports = User;