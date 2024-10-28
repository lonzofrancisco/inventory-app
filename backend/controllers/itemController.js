const db  = require('../config/db');
const { check, validationResult } = require('express-validator');
// Crear un nuevo item

exports.createItem = [
    // Validación de datos
    check('name').notEmpty().withMessage('Name is required'),
    check('item_desc').notEmpty().withMessage('Item description is required'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, item_desc, sku } = req.body;
        const query = 'INSERT INTO items (name, item_desc, sku) VALUES (?, ?, ?)';

        db.query(query, [name, item_desc, sku], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Item created', itemId: results.insertId });
        });
    }
];

// Obtener todos los items
exports.getAllItems = (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener un item por ID
exports.getItemById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(results[0]);
    });
};

// Actualizar un item
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, item_desc, sku } = req.body;
    const query = 'UPDATE items SET name = ?, item_desc = ?, sku = ? WHERE id = ?';

    db.query(query, [name, item_desc, sku, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item updated' });
    });
};

// Eliminar un item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item deleted' });
    });
};
