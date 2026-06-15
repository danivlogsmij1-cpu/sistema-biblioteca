const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./Categoria');

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
      model: Categoria,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'libros',
  timestamps: true,
});

Book.belongsTo(Categoria, { foreignKey: 'categoryId', as: 'category' });
Categoria.hasMany(Book, { foreignKey: 'categoryId' });

module.exports = Book;