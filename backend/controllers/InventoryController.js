const db = require('../config/db');

const { check, validationResult } = require('express-validator');

// Crear una nueva entrada en el inventario
exports.createInventoryEntry = [
    // Validación de datos
    check('item_sku').notEmpty().withMessage('Item SKU is required'),
    check('location').notEmpty().withMessage('Location is required'),
    check('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { item_sku, location, quantity } = req.body;
        const query = 'INSERT INTO inventory (item_sku, location, quantity) VALUES (?, ?, ?)';

        db.query(query, [item_sku, location, quantity], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Inventory entry created', inventoryId: results.insertId });
        });
    }
];
