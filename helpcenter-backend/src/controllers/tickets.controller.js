const { ok } = require('../utils/response');

// ======================================
// TICKETS TEMPORALES
// ======================================

let tickets = [

    {
        id: 1,
        title: "Problema con plataforma",
        description: "No puedo subir tareas",
        estado: "abierto",
        prioridad: "alta",
        usuario_id: 2
    },

    {
    id: 2,
    title: "Error al iniciar sesión",
    description: "El sistema no deja entrar al portal",
    estado: "abierto",
    prioridad: "media",
    usuario_id: 4
},

{
    id: 3,
    title: "Problema con contraseña",
    description: "No puedo recuperar mi contraseña",
    estado: "cerrado",
    prioridad: "alta",
    usuario_id: 5
},

{
    id: 4,
    title: "Falla en plataforma",
    description: "La página tarda demasiado en cargar",
    estado: "abierto",
    prioridad: "baja",
    usuario_id: 2
},

{
    id: 5,
    title: "Error en tareas",
    description: "Las tareas no aparecen completas",
    estado: "cerrado",
    prioridad: "media",
    usuario_id: 4
}

];

// ======================================
// ESTADOS VÁLIDOS
// ======================================

const estadosValidos = ['abierto', 'cerrado'];

// ======================================
// OBTENER TICKETS
// ======================================

const getTickets = (req, res) => {

    return ok(
        res,
        tickets,
        'Tickets obtenidos correctamente'
    );

};

// ======================================
// CREAR TICKET
// ======================================

const createTicket = (req, res) => {

    const {
        title,
        description,
        prioridad
    } = req.body;

    const prioridadesValidas = [
        'baja',
        'media',
        'alta'
    ];

    if (!title || title.trim().length < 5) {

        return res.status(400).json({
            error: 'El título debe tener mínimo 5 caracteres'
        });

    }

    if (!description || description.trim().length < 10) {

        return res.status(400).json({
            error: 'La descripción debe tener mínimo 10 caracteres'
        });

    }

    if (
        !prioridad ||
        !prioridadesValidas.includes(prioridad)
    ) {

        return res.status(400).json({
            error: 'Prioridad inválida'
        });

    }

    const nuevoTicket = {

        id: tickets.length + 1,

        title,

        description,

        estado: 'abierto',

        prioridad,

        usuario_id: req.user.id

    };

    tickets.push(nuevoTicket);

    res.status(201).json({

        message: 'Ticket creado correctamente',

        ticket: nuevoTicket

    });

};

// ======================================
// ACTUALIZAR TICKET
// ======================================

const updateTicket = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description
    } = req.body;

    const ticket = tickets.find(
        t => t.id == id
    );

    if (!ticket) {

        return res.status(404).json({
            error: 'Ticket no encontrado'
        });

    }

    ticket.title = title;
    ticket.description = description;

    res.json({
        message: 'Ticket actualizado correctamente'
    });

};

// ======================================
// ELIMINAR TICKET
// ======================================

const deleteTicket = (req, res) => {

    const { id } = req.params;

    tickets = tickets.filter(
        t => t.id != id
    );

    res.json({
        message: 'Ticket eliminado correctamente'
    });

};

// ======================================
// CAMBIAR ESTADO
// ======================================

const cambiarEstado = (req, res) => {

    const { estado } = req.body;

    if (!estadosValidos.includes(estado)) {

        return res.status(400).json({
            error: 'Estado inválido'
        });

    }

    const ticket = tickets.find(
        t => t.id == req.params.id
    );

    if (!ticket) {

        return res.status(404).json({
            error: 'Ticket no encontrado'
        });

    }

    ticket.estado = estado;

    res.json({
        message: 'Estado actualizado'
    });

};

// ======================================
// EXPORTAR
// ======================================

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    cambiarEstado
};