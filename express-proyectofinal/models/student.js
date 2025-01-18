'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // definimos la relación N:1 con teachers
      Student.belongsTo(models.Teacher, {
        foreignKey: 'teacher_id', as: 'teacher'
      });
    }
  }
  Student.init(
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
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false,
  });
  return Student;
};