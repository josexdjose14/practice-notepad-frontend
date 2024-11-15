import { divRoot, textfile2 } from "../helpers/dom.js";
import { RegisterReq } from "../helpers/urlBackend.js";

export const RegisterView = () => {
    //creacion y captura del DOM
    const fragment = document.createDocumentFragment();
    const RegisterBox = document.createElement("div");

    //modificacion del DOM    
    RegisterBox.innerHTML = `
     <article class="container d-flex flex-col flex-wrap justify-content-center align-items-center py-5 px-2 bg-secondary bg-gradient">
        <div class="container p-1 my-4 w-75">
            <h3 class="mx-auto w-75">Registro</h1>
            <p class="mx-auto w-75">${textfile2}</p>
        </div>       
    </article>

    <article class="container d-flex justify-content-center align-items-center py-5 px-2">
        <form action=${RegisterReq} method="post" class="d-flex row justify-content-center p-1 my-4 w-75">
        <label for="" class="form-label mb-2">Ingrese su nombre</label>
            <input type="text" placeholder="" class="form-control mb-4">
            <label for="" class="form-label mb-2">Ingrese su correo</label>
            <input type="text" placeholder="" class="form-control mb-4">
            <label for="" class="form-label mb-2">Ingrese su contraseña</label>
            <input type="password" placeholder="" class="form-control mb-4">
            <label for="" class="form-label mb-2">Repita su contraseña</label>
            <input type="password" placeholder="" class="form-control mb-4">
            <button type="submit my-b" class="btn btn-primary">Registrarse</button>
        </form>
    </article>
    `
    RegisterBox.className = "col d-flex flex-row justify-content-between bg-light h-100"

    //anexo/posicionamiento del DOM  
    fragment.appendChild(RegisterBox);
    divRoot.appendChild(fragment);

    return divRoot
}