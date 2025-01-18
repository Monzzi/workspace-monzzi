'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // definimos relación 1:1 con user
      Teacher.belongsTo(models.User, {
        foreignKey: 'user_id', as: 'user'
      });
    }
  }
  Teacher.init(
    {
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Relación 1:1 con User
      },
  }, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: false,
  });
  return Teacher;
};