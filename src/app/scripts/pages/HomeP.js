import { addNewNote, deleteNote, editNote, homeList } from "../helpers/requests.js";

export const HomeView = () => {
    const HomeBox = document.querySelector("#staticBox");
    HomeBox.className = "h-100";
    HomeBox.innerHTML = `
    <article class="p-3 bg-info bg-opacity-10 border border-info">
        <h3>Bienvenido <span id="userName"> :D </span></h3>
    </article>
    <article class="p-3 bg-secondary bg-opacity-10 border border-secondary">
        <h5 class="form-label mb-2">Agrega una nueva nota</h5>
        <form action="" class="d-flex" id="createForm">
            <input type="text" placeholder="Creando..." name="userNote" class="form-control me-2">
            <button type="submit" class="btn btn-primary mx-1">Agregar</button>
            <button type="button" class="btn btn-secondary mx-1">Cancelar</button>
        </form>
        <form action="" class="collapse" id="editForm">
            <input type="text" placeholder="Editando..." name="userNote" class="form-control me-2">
            <button type="submit" class="btn btn-warning mx-1">Editar</button>
            <button type="button" class="btn btn-secondary mx-1">Cancelar</button>
        </form>
    </article>
    <article class="p-3 bg-secondary bg-opacity-10 border border-secondary h-100">
        <h5>Lista de notas</h5>
        <table class="table">
            <tr>
                <td class="col-9">Cargando... </td>
                <td class="col-3 text-end"><button class="btn btn-warning mx-1 editBtn">Editar</button>
                    <button class="btn btn-danger mx-1">Eliminar</button>
                </td>
            </tr>
        </table>
    </article>
    `;

    // Funciones
    updateNoteList();
    // Texto del formulario
    let legend = document.querySelector("h5")
    // Formulario para crear nota
    let createForm = document.querySelector("#createForm");
    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = new FormData(createForm);
        let formDataExtracted = Object.fromEntries(formData.entries());
        console.log(formDataExtracted)

        //agregar validaciones
        if (formDataExtracted.userNote.length <= 3) {
            console.log("Esto no es una nota")
            return
        }

        //todo esta correcto
        console.log("enviado informacion al backend")
        try {
            const info = await addNewNote(formDataExtracted);
            console.log(info);

            if (info.message) {
                createForm.reset(); // Limpiar el formulario
                await updateNoteList(); // Actualizar la lista de notas
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
            console.error("Error al tratar de hacer la nota: ", error);
        }
    });
    createForm[2].addEventListener("click", () => {
        createForm.reset();
    })
    // Formulario para editar nota
    let editForm = document.querySelector("#editForm");
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = new FormData(editForm);
        let formDataExtracted = Object.fromEntries(formData.entries());
        console.log("info a editar: ", formDataExtracted)

        //agregar validaciones
        if (formDataExtracted.userNote.length <= 3) {
            console.log("Esto no es una nota")
            return
        }

        //todo esta correcto
        console.log("enviado informacion al backend")
        try {
            const info = await editNote(formDataExtracted, editForm.dataset.db);
            console.log(info);

            if (info.message) {
                editForm.reset(); // Limpiar el formulario
                await updateNoteList(); // Actualizar la lista de notas
                legend.innerText = "Agrega una nueva nota";
                createForm.classList = "d-flex";
                editForm.classList = "collapse";

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
            console.error("Error al tratar de hacer la nota: ", error);
        }
    });
    editForm[2].addEventListener("click", () => {
        legend.innerText = "Agrega una nueva nota";
        createForm.classList = "d-flex";
        editForm.classList = "collapse";
    })

    // Captura de editar y eliminar, se pasa a la funcion que actualiza la lista (completa)

    // Actualizacion de la lista (completa)
    async function updateNoteList() {
        try {
            const response = await homeList();
            console.log("Actualizando la lista de notas con: ", response);

            let userList = response.serverInfo.logedUserNotes;
            let listToChange = document.querySelector("tbody");

            listToChange.innerHTML = ``; // Limpiar la tabla antes de agregar nuevas filas

            // Display de cada item de la lista
            userList.forEach(element => {
                let newTr = document.createElement('tr');
                let texto = element.text;
                newTr.dataset.db = element._id;
                newTr.innerHTML = `
                    <td class="col-9">${element.text}</td>
                    <td class="col-3 text-end">
                        <button class="btn btn-warning mx-1 editBtn" data-db=${element._id}>Editar</button>
                        <button class="btn btn-danger mx-1">Eliminar</button>
                    </td>
                `;
                // Agregar evento de editar
                newTr.children[1].children[0].addEventListener('click', () => {
                    // cambiamos el formulario
                    createForm.reset();
                    createForm.classList = "collapse";
                    editForm.classList = "d-flex";
                    editForm.dataset.db = element._id;
                    // agregamos el texto
                    legend.innerText = "Editando la nota"
                    editForm[0].value = texto;
                })
                newTr.children[1].children[1].addEventListener('click', () => {
                    console.log('activando evento de eliminar')
                    try {
                        let resp = deleteNote(element._id)
                        console.log(resp)
                    } catch (error) {
                        console.log(error)
                    }
                    updateNoteList();
                })
                listToChange.appendChild(newTr);
            });
        } catch (error) {
            console.error("Error al actualizar la lista de notas: ", error);
        }
    }

    return HomeBox
}