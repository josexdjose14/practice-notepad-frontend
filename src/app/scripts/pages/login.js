import { divRoot, textfile1 } from "../helpers/dom.js";
import { loginReq } from "../helpers/urlBackend.js";

export const loginView = () => {
    //creacion y captura del DOM
    const fragment = document.createDocumentFragment();
    const loginBox = document.createElement("div");

    //modificacion del DOM    
    loginBox.innerHTML = `
     <article class="container d-flex flex-col flex-wrap justify-content-center align-items-center py-4 px-1 bg-secondary bg-gradient col-6 h-100">
        <div class="container p-1 my-5 w-75">
            <h1 class="mx-auto w-75">Descripcion del proyecto</h1>
            <p class="mx-auto w-75">${textfile1}</p>
        </div>       
    </article>

    <article class="container d-flex justify-content-center align-items-center py-4 px-1" col-6 h-100>
        <form action=${loginReq} method="post" class="d-flex row justify-content-center p-1 my-5 w-75">
            <label for="" class="form-label mb-2">Ingrese su correo</label>
            <input type="text" placeholder="" class="form-control mb-4">
            <label for="" class="form-label mb-2">Ingrese su contraseña</label>
            <input type="password" placeholder="" class="form-control mb-4">
            <button type="submit my-b" class="btn btn-primary">Ingresar</button>
        </form>
    </article>
    `
    loginBox.className = "d-flex flex-row bg-light h-100"

    //anexo/posicionamiento del DOM  
    fragment.appendChild(loginBox);
    divRoot.appendChild(fragment);

    console.log("info del div", loginBox)
    return divRoot
}