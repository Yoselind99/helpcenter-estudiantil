// ======================================
// VALIDAR TOKEN
// ======================================

const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

if (rol !== "admin") {

    alert("Acceso denegado");

    window.location.href = "index.html";

}

if (!token) {

    alert("Debes iniciar sesión");

    window.location.href = "login.html";

}

const API_TICKETS = "https://helpcenter-estudiantil.onrender.com/tickets";
const API_USERS = "https://helpcenter-estudiantil.onrender.com/users";

// ======================================
// VARIABLES
// ======================================

let ticketsGlobal = [];

// ======================================
// BIENVENIDA
// ======================================

window.onload = () => {

    const bienvenida =
        document.getElementById("bienvenida");

    if (bienvenida) {

        bienvenida.textContent =
            "Bienvenido administrador";

    }

};

// ======================================
// CARGAR TICKETS
// ======================================

async function cargarTickets() {

    try {

        const response = await fetch(API_TICKETS, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const result = await response.json();

        ticketsGlobal = result.data;

        mostrarTickets(ticketsGlobal);

        // ======================================
        // ESTADÍSTICAS
        // ======================================

        document.getElementById("totalTickets")
            .textContent = ticketsGlobal.length;

        const alta = ticketsGlobal.filter(
            t => t.prioridad === "alta"
        );

        document.getElementById("ticketsAlta")
            .textContent = alta.length;

        const abiertos = ticketsGlobal.filter(
            t => t.estado === "abierto"
        );

        const cerrados = ticketsGlobal.filter(
            t => t.estado === "cerrado"
        );

        document.getElementById("ticketsAbiertos")
            .textContent = abiertos.length;

        document.getElementById("ticketsCerrados")
            .textContent = cerrados.length;

    } catch (error) {

        console.error(error);

    }

}

// ======================================
// MOSTRAR TICKETS
// ======================================

function mostrarTickets(tickets) {

    const contenido =
        document.getElementById("contenido");

    contenido.innerHTML = "";

    tickets.forEach(ticket => {

        const card = document.createElement("div");

        card.classList.add("card");

        let estadoClase = "";

        if (ticket.estado === "cerrado") {

            estadoClase = "alta";

        } else {

            estadoClase = "baja";

        }

        card.innerHTML = `

            <h3>🎫 ${ticket.title}</h3>

            <p>
                <strong>ID:</strong>
                ${ticket.id}
            </p>

            <p>
                <strong>Descripción:</strong><br>
                ${ticket.description}
            </p>

            <p>
                <strong>Estado:</strong>

                <span class="prioridad ${estadoClase}">
                    ${ticket.estado}
                </span>
            </p>

            <p>
                <strong>Prioridad:</strong>

                <span class="prioridad ${ticket.prioridad}">
                    ${ticket.prioridad}
                </span>
            </p>

            ${ticket.estado !== "cerrado"
            ?
            `
            <button onclick="confirmarCerrar(${ticket.id})">
                ❌ Cerrar ticket
            </button>
            `
            :
            `
            <button disabled>
                ✅ Ticket cerrado
            </button>
            `
            }

        `;

        contenido.appendChild(card);

    });

}

// ======================================
// BUSCADOR
// ======================================

const buscador =
document.getElementById("buscador");

if (buscador) {

    buscador.addEventListener("keyup", () => {

        const texto =
        buscador.value.toLowerCase();

        const filtrados =
        ticketsGlobal.filter(ticket =>

            ticket.title
            .toLowerCase()
            .includes(texto)

        );

        mostrarTickets(filtrados);

    });

}

// ======================================
// CONFIRMAR CERRAR
// ======================================

function confirmarCerrar(id) {

    const confirmar = confirm(
        "¿Seguro que deseas cerrar este ticket?"
    );

    if (confirmar) {

        cambiarEstado(id, "cerrado");

    }

}

// ======================================
// CARGAR USUARIOS
// ======================================

async function cargarUsuarios() {

    try {

        const response = await fetch(API_USERS, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const result = await response.json();

        const contenido =
        document.getElementById("contenido");

        contenido.innerHTML = "";

        document.getElementById("totalUsuarios")
        .textContent = result.data.length;

        result.data.forEach(user => {

            const card =
            document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `

                <h3>👤 ${user.nombre}</h3>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p>
                    <strong>Rol:</strong>

                    <span class="prioridad baja">
                        ${user.rol}
                    </span>
                </p>

            `;

            contenido.appendChild(card);

        });

    } catch (error) {

        console.error(error);

    }

}

// ======================================
// CAMBIAR ESTADO
// ======================================

async function cambiarEstado(id, estado) {

    try {

        const response = await fetch(

            `https://helpcenter-estudiantil.onrender.com/tickets/${id}/estado`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({
                    estado: estado
                })

            }

        );

        const result = await response.json();

        alert(result.message);

        cargarTickets();

    } catch (error) {

        console.error(error);

    }

}
// ======================================
// CARGAR ESTADÍSTICAS
// ======================================

async function cargarEstadisticas() {

    try {

        // =========================
        // TICKETS
        // =========================

        const response = await fetch(API_TICKETS, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const result = await response.json();

        ticketsGlobal = result.data;

        document.getElementById("totalTickets")
            .textContent = ticketsGlobal.length;

        const alta = ticketsGlobal.filter(
            t => t.prioridad === "alta"
        );

        document.getElementById("ticketsAlta")
            .textContent = alta.length;

        const abiertos = ticketsGlobal.filter(
            t => t.estado === "abierto"
        );

        const cerrados = ticketsGlobal.filter(
            t => t.estado === "cerrado"
        );

        document.getElementById("ticketsAbiertos")
            .textContent = abiertos.length;

        document.getElementById("ticketsCerrados")
            .textContent = cerrados.length;

        // =========================
        // USUARIOS
        // =========================

        const responseUsers = await fetch(API_USERS, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const resultUsers = await responseUsers.json();

        document.getElementById("totalUsuarios")
            .textContent = resultUsers.data.length;

    } catch (error) {

        console.error(error);

    }

}
// ======================================
// LOGOUT
// ======================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("rol");

    alert("Sesión cerrada");

    window.location.href = "login.html";

}

// ======================================
// AUTO CARGAR
// ======================================

cargarEstadisticas();