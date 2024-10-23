const db = require('../server');  // Conexión a la base de datos

// Obtener todos los items
exports.getItems = (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo item
exports.createItem = (req, res) => {
    const { name, sku, ean } = req.body;
    db.query('INSERT INTO items (name, sku, ean) VALUES (?, ?, ?)', [name, sku, ean], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, name, sku, ean });
    });
};

// Obtener un item por ID
exports.getItemById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM items WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        res.json(result[0]);
    });
};

// Actualizar un item por ID
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, sku, ean } = req.body;
    db.query('UPDATE items SET name = ?, sku = ?, ean = ? WHERE id = ?', [name, sku, ean, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item actualizado' });
    });
};

// Eliminar un item por ID
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item eliminado' });
    });
};


