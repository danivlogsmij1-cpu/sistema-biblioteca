const Book = require('../models/Book');
const Category = require('../models/Category');
const { Op } = require('sequelize');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
      order: [['title', 'ASC']],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }],
    });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, publicationYear, categoryId } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(400).json({ message: 'La categoría no existe' });

    const newBook = await Book.create({ title, author, publicationYear, categoryId });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    const { title, author, publicationYear, categoryId } = req.body;
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) return res.status(400).json({ message: 'La categoría no existe' });
    }

    await book.update({ title, author, publicationYear, categoryId });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    await book.destroy();
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchByTitle = async (req, res) => {
  try {
    const { titulo } = req.query;
    if (!titulo) return res.status(400).json({ message: 'Debe proporcionar un título' });

    const books = await Book.findAll({
      where: { title: { [Op.iLike]: `%${titulo}%` } },
      include: [{ model: Category, as: 'category' }],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchByAuthor = async (req, res) => {
  try {
    const { autor } = req.query;
    if (!autor) return res.status(400).json({ message: 'Debe proporcionar un autor' });

    const books = await Book.findAll({
      where: { author: { [Op.iLike]: `%${autor}%` } },
      include: [{ model: Category, as: 'category' }],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};