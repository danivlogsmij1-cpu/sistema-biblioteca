const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.get('/buscar/titulo', bookController.searchByTitle);
router.get('/buscar/autor', bookController.searchByAuthor);

module.exports = router;