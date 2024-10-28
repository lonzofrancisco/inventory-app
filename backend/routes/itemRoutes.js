const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// Crear un item
router.post('/', ItemController.createItem);

// Obtener todos los items
router.get('/', ItemController.getAllItems);

// Obtener un item por ID
router.get('/:id', ItemController.getItemById);

// Actualizar un item
router.put('/:id', ItemController.updateItem);

// Eliminar un item
router.delete('/:id', ItemController.deleteItem);

module.exports = router;
