const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const Author = sequelize.define('Author', {    // modelo Author
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { tableName: 'authors' });

const Book = sequelize.define('Book', {     // modelo Book

  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantPages: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { tableName: 'books' });

Author.hasMany(Book, { as: 'books', foreignKey: 'authorId' });  // 1:n
Book.belongsTo(Author, { foreignKey: 'authorId' });  // 1:1

module.exports = {
  Author,
  Book,
};
