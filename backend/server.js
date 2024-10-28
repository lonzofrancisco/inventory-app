const express = require('express');
const { connectWithRetry } = require('./config/db');
const healthRoutes = require('./routes/HealthRoutes');
const itemRoutes = require('./routes/itemRoutes');
const InventoryRoutes = require('./routes/InventoryRoutes');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Iniciar la conexión a la base de datos con reintentos
connectWithRetry();

// Usar la nueva ruta
app.use('/healthCheck', healthRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/inventory', InventoryRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
