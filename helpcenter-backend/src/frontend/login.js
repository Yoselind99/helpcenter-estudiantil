const API_LOGIN = "http://localhost:3000/auth/login";

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value.trim();

        const response = await fetch(API_LOGIN, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const result = await response.json();

        console.log("Login:", result);

        if (response.ok) {

            // ======================================
            // GUARDAR TOKEN
            // ======================================

            localStorage.setItem("token", result.token);

            // ======================================
            // GUARDAR ROL
            // ======================================

            localStorage.setItem("rol", result.user.rol);

            alert("Login exitoso");

            // ======================================
            // REDIRECCIONAR SEGÚN ROL
            // ======================================

            if (result.user.rol === "admin") {

                window.location.href = "admin.html";

            } else {

                window.location.href = "index.html";

            }

        } else {

            alert(result.error || "Credenciales incorrectas");

        }

    } catch (error) {

        console.error("Error login:", error);

    }

});