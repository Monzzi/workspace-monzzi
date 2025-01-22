'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {

    static associate(models) {
      // definimos relación 1:1 con user
      Teacher.belongsTo(models.User, {
        foreignKey: 'user_id', as: 'user',
      });
       // Relación 1:N con Students
      Teacher.hasMany(models.Student, {
        foreignKey: 'teacher_id', as: 'students',
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