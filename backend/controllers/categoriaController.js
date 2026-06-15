const Categoria = require('../models/Categoria');
const Book = require('../models/Book');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categoria.findAll({
      order: [['nombre', 'ASC']],
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Categoria.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const category = await Categoria.create({
      nombre: nombre.trim(),
      descripcion,
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
    }

    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Categoria.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    const { nombre, descripcion } = req.body;

    if (nombre !== undefined && !nombre.trim()) {
      return res.status(400).json({ message: 'El nombre no puede estar vacío' });
    }

    await category.update({
      nombre: nombre !== undefined ? nombre.trim() : category.nombre,
      descripcion: descripcion !== undefined ? descripcion : category.descripcion,
    });

    res.json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
    }

    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Categoria.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    const booksCount = await Book.count({
      where: { categoryId: category.id },
    });

    if (booksCount > 0) {
      return res.status(409).json({
        message: 'No se puede eliminar una categoría con libros asociados',
      });
    }

    await category.destroy();
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};