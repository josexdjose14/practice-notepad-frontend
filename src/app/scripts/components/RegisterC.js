import { textfile2 } from "../helpers/dom.js";
import { registerNewUser } from "../helpers/requests.js";

export const RegisterComponent = () => {
    // creacion y modificacion del DOM
    // const RegisterBox = document.createElement("div");
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
            <input type="text" name="userName" class="form-control mb-4" value="Jose Henao">
            <label for="" class="form-label mb-2">Ingrese su correo</label>
            <input type="text" name="userEmail" class="form-control mb-4" value="josexdjose14@gmail.com">
            <label for="" class="form-label mb-2">Ingrese su contraseña</label>
            <input type="password" name="userPassword" class="form-control mb-4" value="141414">
            <label for="" class="form-label mb-2">Repita su contraseña</label>
            <input type="password" name="userPasswordRepeat" class="form-control mb-4" value="141414">
            <button type="submit" class="btn btn-primary">Registrarse</button>
        </form>
    </article>
    `

    // funciones
    let formRaw = document.querySelector("form")
    formRaw.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = new FormData(formRaw);
        let formDataExtracted = Object.fromEntries(formData.entries());
        console.log(formDataExtracted)
        if (formDataExtracted.userPassword !== formDataExtracted.userPasswordRepeat) {
            console.log("las contraseñas no se parecen")
            return
        }
        console.log("sending info")
        let info;
        try {
            info = await registerNewUser(formDataExtracted);
            console.log(info); // Aquí puedes trabajar con la respuesta JSON

            if (info.message) {
                // loginView(); redireccionar al login
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