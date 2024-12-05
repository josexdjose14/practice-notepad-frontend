import { textfile2 } from "../helpers/dom.js";
import { registerNewUser } from "../helpers/requests.js";

export const RegisterView = () => {
    const RegisterBox = document.querySelector("#staticBox");
    RegisterBox.className = "col d-flex flex-row justify-content-between bg-light h-100"
    RegisterBox.innerHTML = `
     <article class="container d-flex flex-col flex-wrap justify-content-center align-items-center py-5 px-2 bg-secondary bg-gradient">
        <div class="container p-1 my-4 w-75">
            <h3 class="mx-auto w-75">Registro</h1>
            <p class="mx-auto w-75">${textfile2}</p>
        </div>       
    </article>

    <article class="container d-flex justify-content-center align-items-center py-5 px-2">
        <form class="d-flex row justify-content-center p-1 my-4 w-75">
        <label for="" class="form-label mb-2">Ingrese su nombre</label>
            <input type="text" name="userName" class="form-control mb-4">
            <label for="" class="form-label mb-2">Ingrese su correo</label>
            <input type="text" name="userEmail" class="form-control mb-4">
            <label for="" class="form-label mb-2">Ingrese su contraseña</label>
            <input type="password" name="userPassword" class="form-control mb-4">
            <label for="" class="form-label mb-2">Repita su contraseña</label>
            <input type="password" name="userPasswordRepeat" class="form-control mb-4">
            <button type="submit" class="btn btn-primary">Registrarse</button>
        </form>
    </article>
    `

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case "userName":
                if (!value.trim()) return "El nombre no puede estar vacío.";
                break;
            case "userEmail":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "El correo electrónico no es válido.";
                break;
            case "userPassword":
                if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
                break;
            case "userPasswordRepeat":
                return null; // La validación de repetición se hace aparte.
            default:
                return null;
        }
    };

    // funciones
    let formRaw = document.querySelector("form")
    formRaw.addEventListener("submit", async (e) => {
        e.preventDefault();
        // captura informacion del formulario
        let formData = new FormData(formRaw);
        let formDataExtracted = Object.fromEntries(formData.entries());
        // console.log(formDataExtracted)
        // validaciones aplicadas
        let errores = [];
        Object.keys(formDataExtracted).forEach((fieldName) => {
            const error = validateField(fieldName, formDataExtracted[fieldName]);
            if (error) errores.push(error);
        });
        // esta se queda a fuera por simplicidad
        if (formDataExtracted.userPassword !== formDataExtracted.userPasswordRepeat) {
            errores.push("Las contraseñas no coinciden.");
        }
        // mostrar errores
        if (errores.length > 0) {
            Swal.fire({
                title: "Errores en el formulario",
                html: `<ul>${errores.map((err) => `<li>${err}</li>`).join("")}</ul>`,
                icon: "error",
            });
            return;
        }
        // en caso de ningun error
        // console.log("informacion valida, enviando...")
        try {
            let info = await registerNewUser(formDataExtracted);
            // console.log(info);

            if (info.message) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: info.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location.hash = "login"
            } else if (info.error) {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: info.error,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            console.error("Error al recibir la informacion ", error);
        }
    });

    return RegisterBox;
}