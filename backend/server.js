const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

function checkApiAlive(callback) {
    db.query('SELECT 1 + 2 AS result', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const sumResult = results[0].result;
        callback(null, sumResult);
    });
}
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
            checkApiAlive((err, sumResult) => {
                if (err) {
                    return res.status(500).send({ error: 'Error en la consulta', details: err });
                }
                console.log({ message: 'API is alive', sum: sumResult });
            });
            
        }
    });
}

connectWithRetry();



// Ruta para verificar si la API está viva
app.get('/alive', (req, res) => {
    console.log('apialive');
    checkApiAlive((err, sumResult) => {
        if (err) {
            return res.status(500).send({ error: 'Error en l a consulta', details: err });
        }
        res.json({ message: 'API is alive', sum: sumResult });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
