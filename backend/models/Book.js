const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    field: 'publication_year',
    validate: {
      min: 1450,
      max: new Date().getFullYear(),
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'libros',
  timestamps: true,
});

Book.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Book, { foreignKey: 'categoryId' });

module.exports = Book;