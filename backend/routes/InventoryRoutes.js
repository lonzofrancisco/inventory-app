const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/InventoryController');

// Rutas para ítems

// Rutas para inventario
router.post('/', InventoryController.createInventoryEntry);

module.exports = router;
