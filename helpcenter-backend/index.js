require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// rutas
const usersRoutes = require('./src/routes/users.routes');
const ticketsRoutes = require('./src/routes/tickets.routes');
const authRoutes = require('./src/routes/auth.routes');

// swagger
const swaggerSpec = require('./src/config/swagger');

// middlewares
const logger = require('./src/middlewares/logger');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();


// ======================
// MIDDLEWARES GLOBALES
// ======================

app.use(cors());
app.use(express.json());
app.use(logger);


// ======================
// RUTAS
// ======================

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/tickets', ticketsRoutes);

// documentación swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ======================
// MIDDLEWARE DE ERRORES
// (SIEMPRE AL FINAL)
// ======================

app.use(errorHandler);


// ======================
// SERVIDOR
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


