import { homeList } from "../helpers/requests.js";

export const HomeView = () => {
    const HomeBox = document.querySelector("#staticBox");
    HomeBox.className = "h-100";
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
    `;

    // funciones
    console.log("deberia estar cargando")
    homeList().then(response => {
        console.log(response);
    }).catch(error => {
        console.error("Error al cargar la lista:", error);
    });

    return HomeBox
}