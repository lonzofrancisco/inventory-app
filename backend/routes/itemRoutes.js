const express = require('express');
const router = express.Router();
const { getItems, createItem, getItemById, updateItem, deleteItem } = require('../controllers/itemController');

// Rutas para la tabla items
router.get('/', getItems);         // Obtener todos los items
router.post('/', createItem);      // Crear un nuevo item
router.get('/:id', getItemById);   // Obtener un item por ID
router.put('/:id', updateItem);    // Actualizar un item por ID
router.delete('/:id', deleteItem); // Eliminar un item por ID

module.exports = router;
