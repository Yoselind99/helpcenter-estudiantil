// ===============================
// VALIDAR TOKEN
// ===============================

const token = localStorage.getItem("token");

if (!token) {

    alert("Debes iniciar sesión");

    window.location.href = "login.html";

}

const API_URL = "https://helpcenter-estudiantil.onrender.com/tickets";

// ===============================
// CARGAR TICKETS
// ===============================

async function cargarTickets() {

    const rol = localStorage.getItem("rol");

    if (rol !== "admin") {

        alert("Acceso denegado");

        return;

    }

    try {

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const result = await response.json();

        const lista =
            document.getElementById("listaTickets");

        lista.innerHTML = "";

        result.data.forEach(ticket => {

            const li = document.createElement("li");

            li.innerHTML = `

                <strong>${ticket.title}</strong>

                <br>

                ${ticket.description}

                <br><br>

                Estado:
                ${ticket.estado}

                <br>

                Prioridad:
                <span class="prioridad ${ticket.prioridad}">
                    ${ticket.prioridad}
                </span>

            `;

            lista.appendChild(li);

        });

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// CREAR TICKET
// ===============================

const form =
    document.getElementById("formTicket");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const title =
            document.getElementById("title").value;

        const description =
            document.getElementById("descripcion").value;

        const prioridad =
            document.getElementById("prioridad").value;

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization":
                    "Bearer " + token

            },

            body: JSON.stringify({

                title,
                description,
                prioridad

            })

        });

        const result = await response.json();

        console.log(result);

        const mensaje =
            document.getElementById("mensaje");

        if (response.ok) {

            mensaje.textContent =
                "✅ Ticket creado correctamente";

            mensaje.style.color = "green";

            form.reset();

        } else {

            mensaje.textContent =
                result.error;

            mensaje.style.color = "red";

        }

    } catch (error) {

        console.error(error);

    }

});

// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("rol");

    alert("Sesión cerrada");

    window.location.href = "login.html";

}