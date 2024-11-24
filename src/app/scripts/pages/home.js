import { divRoot } from "../helpers/dom.js";
import { recoverToken } from "../helpers/requests.js";

export const HomeView = () => {
    //creacion y captura del DOM
    const fragment = document.createDocumentFragment();
    // const HomeBox = document.createElement("div");
    const HomeBox = document.querySelector("#staticBox");

    //modificacion del DOM    
    HomeBox.innerHTML = `
    <article class="p-3 bg-info bg-opacity-10 border border-info">
    <h3>Bienvenido José</h3>
</article>
<article class="p-3 bg-secondary bg-opacity-10 border border-secondary">
    <h5 class="form-label mb-2">Agrega una nueva nota</h5>
    <form action="" class="d-flex">
        <input autofocus type="text" placeholder="Creando..." class="form-control me-2">
        <button type="submit" class="btn btn-primary mx-1">Agregar</button>
        <button class="btn btn-secondary mx-1">Cancelar</button>
    </form>
</article>
<article class="p-3 bg-secondary bg-opacity-10 border border-secondary h-100">
    <h5>Lista de notas</h5>
    <table class="table">
        <tr>
            <td class="col-9">Hacer comida</td>
            <td class="col-3 text-end"><button class="btn btn-warning mx-1">Editar</button>
                <button class="btn btn-danger mx-1">Eliminar</button>
            </td>
        </tr>
<tr>
            <td class="col-9">Hacer comida</td>
            <td class="col-3 text-end"><button class="btn btn-warning mx-1">Editar</button>
                <button class="btn btn-danger mx-1">Eliminar</button>
            </td>
        </tr>
        <tr>
            <td class="col-9">Hacer comida</td>
            <td class="col-3 text-end"><button class="btn btn-warning mx-1">Editar</button>
                <button class="btn btn-danger mx-1">Eliminar</button>
            </td>
        </tr>
    </table>
</article>

    `

    HomeBox.className = "h-100"

    //anexo/posicionamiento del DOM  
    // fragment.appendChild(HomeBox);
    // divRoot.appendChild(fragment);
    // ya es innecesario porque se esta modificando un div desde el index.js

    //funciones
    HomeBox.addEventListener('DOMContentLoaded', () => {
        console.log("deberia estar cargando")
        const lastToken = recoverToken();
        console.log(lastToken)
    })

    //return divRoot
    return HomeBox
}