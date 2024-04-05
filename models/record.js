'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Record.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Record.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Record.init({
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true
  })
  return Record
}
