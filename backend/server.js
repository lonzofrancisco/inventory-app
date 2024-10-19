const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Función para intentar conectar a la base de datos
function connectWithRetry() {
    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ', err);
            console.log('Reintentando conexión en 5 segundos...');
            setTimeout(connectWithRetry, 60000*5); // Reintentar después de 5 min
        } else {
            console.log('Conectado a la base de datos MySQL');
        }
    });
}

connectWithRetry();


// Rutas para el CRUD

// Crear un producto
app.post('/productos', (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const sql = 'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)';
    db.query(sql, [nombre, precio, descripcion], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, nombre, precio, descripcion });
    });
});

// Leer todos los productos
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Leer un producto por ID
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result[0]);
    });
});

// Actualizar un producto
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const sql = 'UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?';
    db.query(sql, [nombre, precio, descripcion, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ id, nombre, precio, descripcion });
    });
});

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(204).send();
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
