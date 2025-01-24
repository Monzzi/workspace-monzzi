'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // relación 1:1 con teacher
      User.hasOne(models.Teacher, {
        foreignKey: 'user_id', as: 'teacher',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, // desactivo estos que sequelize pone por defecto en el enunciado no aparece.
  });
  return User;
};