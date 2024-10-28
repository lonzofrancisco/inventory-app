const {checkDBAlive }  = require('../config/db');

// Función para verificar si la base de datos está conectada

const healthCheck = (req, res) => {
    checkDBAlive((err, sumResult) => {
        if (err) {
            return res.status(500).send({ error: 'Error en la consulta', details: err });
        }
        res.json({ message: 'API is alive!!', sum: sumResult });
    });
};

module.exports = {
    healthCheck
};
