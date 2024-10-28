const mysql = require('mysql2');

// Crear la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function checkDBAlive(callback) {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const sumResult = results[0].result;
        callback(null, sumResult);
    });
}

// Función para intentar conectar con reintentos
function connectWithRetry() {
    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ', err);
            console.log('Reintentando conexión en 5 segundos...');
            setTimeout(connectWithRetry, 60000 * 5); // Reintentar después de 5 minutos
        } else {
            console.log('Conectado a la base de datos MySQL');
            checkDBAlive((err, sumResult) => {
                if (err) {
                    console.error('Error en la consulta', err);
                } else {
                    console.log({ message: 'API is alive', sum: sumResult });
                }
            });
        }
    });
}

module.exports = db;
module.exports.connectWithRetry = connectWithRetry;
module.exports.checkDBAlive = checkDBAlive;