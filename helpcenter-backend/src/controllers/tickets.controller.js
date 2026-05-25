const db = require('../config/db');
const { ok } = require('../utils/response');

// ✅ Estados válidos
const estadosValidos = ['abierto', 'cerrado'];

// ======================================
// OBTENER TICKETS
// ======================================

const getTickets = (req, res, next) => {

    try {

        const query = `
            SELECT 
                id,
                title,
                description,
                estado,
                prioridad
            FROM tickets
        `;

        db.query(query, (err, results) => {

            if (err) return next(err);

            return ok(
                res,
                results,
                'Tickets obtenidos correctamente'
            );

        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// CREAR TICKET
// ======================================

const createTicket = (req, res, next) => {

    try {

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

        // ✅ Validar título
        if (!title || title.trim().length < 5) {

            return res.status(400).json({
                error: 'El título debe tener mínimo 5 caracteres'
            });

        }

        // ✅ Validar descripción
        if (!description || description.trim().length < 10) {

            return res.status(400).json({
                error: 'La descripción debe tener mínimo 10 caracteres'
            });

        }

        // ✅ Validar prioridad
        if (
            !prioridad ||
            !prioridadesValidas.includes(prioridad)
        ) {

            return res.status(400).json({
                error: 'Prioridad inválida'
            });

        }

        const query = `
            INSERT INTO tickets
            (
                title,
                description,
                estado,
                usuario_id,
                prioridad
            )
            VALUES (?, ?, 'abierto', ?, ?)
        `;

        db.query(

            query,

            [
                title,
                description,
                req.user.id,
                prioridad
            ],

            (err, result) => {

                if (err) return next(err);

                res.status(201).json({

                    message: 'Ticket creado correctamente',

                    id: result.insertId

                });

            }

        );

    } catch (error) {

        next(error);

    }

};

// ======================================
// ACTUALIZAR TICKET
// ======================================

const updateTicket = (req, res, next) => {

    try {

        const { id } = req.params;

        const {
            title,
            description
        } = req.body;

        if (!title || !description) {

            return res.status(400).json({
                error: 'Title y description son obligatorios'
            });

        }

        const query = `
            UPDATE tickets
            SET title = ?, description = ?
            WHERE id = ?
        `;

        db.query(

            query,

            [
                title,
                description,
                id
            ],

            (err, result) => {

                if (err) return next(err);

                if (result.affectedRows === 0) {

                    return res.status(404).json({
                        error: 'Ticket no encontrado'
                    });

                }

                res.json({
                    message: 'Ticket actualizado correctamente'
                });

            }

        );

    } catch (error) {

        next(error);

    }

};

// ======================================
// ELIMINAR TICKET
// ======================================

const deleteTicket = (req, res, next) => {

    try {

        const { id } = req.params;

        const query = `
            DELETE FROM tickets
            WHERE id = ?
        `;

        db.query(query, [id], (err, result) => {

            if (err) return next(err);

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    error: 'Ticket no encontrado'
                });

            }

            res.json({
                message: 'Ticket eliminado correctamente'
            });

        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// CAMBIAR ESTADO
// ======================================

const cambiarEstado = (req, res, next) => {

    try {

        const { estado } = req.body;

        if (!estadosValidos.includes(estado)) {

            return res.status(400).json({
                error: 'Estado inválido'
            });

        }

        db.query(

            `
            UPDATE tickets
            SET estado = ?
            WHERE id = ?
            `,

            [estado, req.params.id],

            (err, result) => {

                if (err) return next(err);

                if (result.affectedRows === 0) {

                    return res.status(404).json({
                        error: 'Ticket no encontrado'
                    });

                }

                res.json({
                    message: 'Estado actualizado'
                });

            }

        );

    } catch (error) {

        next(error);

    }

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