const express = require('express');

const router = express.Router();

const authMiddleware =
require('../middlewares/authMiddleware');

const roleMiddleware =
require('../middlewares/roleMiddleware');

const ticketsController =
require('../controllers/tickets.controller');


// ======================================
// OBTENER TICKETS
// ======================================

router.get(
    '/',
    authMiddleware,
    roleMiddleware('admin', 'tecnico'),
    ticketsController.getTickets
);


// ======================================
// CREAR TICKET
// ======================================

router.post(
    '/',
    authMiddleware,
    roleMiddleware('usuario', 'admin'),
    ticketsController.createTicket
);


// ======================================
// ACTUALIZAR TICKET
// ======================================

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('usuario', 'admin'),
    ticketsController.updateTicket
);


// ======================================
// CAMBIAR ESTADO
// ======================================

router.put(
    '/:id/estado',
    authMiddleware,
    roleMiddleware('tecnico', 'admin'),
    ticketsController.cambiarEstado
);


// ======================================
// ELIMINAR TICKET
// ======================================

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    ticketsController.deleteTicket
);

module.exports = router;