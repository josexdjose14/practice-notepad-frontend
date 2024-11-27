import { textfile1 } from "../helpers/dom.js";
import { loginUser, saveToken } from "../helpers/requests.js";
import { LOGINURL } from "../helpers/urlBackend.js";

export const loginComponent = () => {
    //creacion del DOM
    //const fragment = document.createDocumentFragment();
    const loginBox = document.querySelector("#staticBox");
    // const loginBox = document.createElement('div');

    //modificacion del DOM    
    loginBox.className = "d-flex flex-row bg-light h-100"
    loginBox.innerHTML = `
     <article class="container d-flex flex-col flex-wrap justify-content-center align-items-center py-4 px-1 bg-secondary bg-gradient col-6 h-100">
        <div class="container p-1 my-5 w-75">
            <h1 class="mx-auto w-75">Descripcion del proyecto</h1>
            <p class="mx-auto w-75">${textfile1}</p>
        </div>       
    </article>

    <article class="container d-flex justify-content-center align-items-center py-4 px-1" col-6 h-100>
        <form action=${LOGINURL} method="post" class="d-flex row justify-content-center p-1 my-5 w-75">
            <label for="" class="form-label mb-2">Ingrese su correo</label>
            <input type="text" name="userEmail" class="form-control mb-4">
            <label for="" class="form-label mb-2">Ingrese su contraseña</label>
            <input type="password" name="userPassword" class="form-control mb-4">
            <button type="submit my-b" class="btn btn-primary">Ingresar</button>
        </form>
    </article>
    `;

    //funciones
    let formRaw = document.querySelector("form");
    formRaw.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = new FormData(formRaw);
        let formDataExtracted = Object.fromEntries(formData.entries());
        console.log(formDataExtracted)

        //agregar validaciones
        if (formDataExtracted.userEmail.length <= 5) {
            console.log("Email no valido")
            return
        }

        //todo esta correcto
        console.log("sending info")
        let info;
        try {
            info = await loginUser(formDataExtracted);
            console.log(info);

            if (info.message) {
                saveToken(info.serverInfo)
                // redireccionar al Home
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

    return loginBox;
}