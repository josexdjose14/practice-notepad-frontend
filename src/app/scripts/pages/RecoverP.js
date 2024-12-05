import { textfile3 } from "../helpers/dom.js";
import { changePassword, verifyEmail } from "../helpers/requests.js";

export const RecoverView = () => {
    const RecoverBox = document.querySelector("#staticBox");
    RecoverBox.className = "col d-flex flex-row justify-content-between bg-light h-100"
    RecoverBox.innerHTML = `
     <article class="container d-flex flex-col flex-wrap justify-content-center align-items-center py-5 px-2 bg-secondary bg-gradient">
        <div class="container p-1 my-4 w-75">
            <h3 class="mx-auto w-75">Recuperar contraseña</h1>
            <p class="mx-auto w-75">${textfile3}</p>
        </div>       
    </article>

    <article class="container d-flex flex-column justify-content-center align-items-center">

        <form id="recoverEmail" class="d-flex row justify-content-center p-1 my-3 w-75">
                <label for="" class="form-label mb-1">Ingresa el correo a recuperar</label>
                <input type="text" name="userEmail" class="form-control mb-2">
                <button type="submit" class="btn btn-primary mb-2">Verificar</button>
        </form>

        <h3 class="my-2"> O </h3>

        <form id="recoverPassword" class="d-flex row justify-content-center p-1 my-3 w-75">
            <label for="" class="form-label mb-1">Coloca el codigo enviado a tu Email</label>
            <input type="text" name="userToken" class="form-control mb-2">
            <label for="" class="form-label mb-1">Ingrese su nueva contraseña</label>
            <input type="password" name="userPassword" class="form-control mb-2">
            <label for="" class="form-label mb-1">Repita su nueva contraseña</label>
            <input type="password" name="userPasswordRepeat" class="form-control mb-2">
            <button type="submit" class="btn btn-primary mb-2">Cambiar</button>
        </form>
    </article>
    `;

    let form1 = document.querySelector("#recoverEmail");
    let form2 = document.querySelector("#recoverPassword");

    form1.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = new FormData(form1);
        let formDataExtracted = Object.fromEntries(formData.entries());
        // console.log("form inputs: ", formDataExtracted.userEmail)

        //no voy a agregarle validaciones (al final si le puse :,c)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formDataExtracted.userEmail.trim()) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "no puedo ver correos invicibles",
                showConfirmButton: false,
                timer: 2000
            });
            return
        } else if (!emailRegex.test(formDataExtracted.userEmail)) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "y si metes un email valido?",
                showConfirmButton: false,
                timer: 2000
            });
            return
        }
        // console.log("enviando al backend")
        try {
            let info = await verifyEmail(formDataExtracted.userEmail);
            // console.log(info);
            if (info.message) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: info.message,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: info.error,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            console.log(error)
        }
    })
    form2.addEventListener("submit", async (e) => {
        e.preventDefault();
        let formData = new FormData(form2);
        let formDataExtracted = Object.fromEntries(formData.entries());
        // console.log(formDataExtracted)
        if (formDataExtracted.userPassword.length < 6) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "claro que hay una validacion pidiendo una cantidad minima de digitos...6",
                showConfirmButton: false,
                timer: 2000
            });
            return
        }
        if (formDataExtracted.userPassword !== formDataExtracted.userPasswordRepeat) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "no se parecen las contraseñas",
                showConfirmButton: false,
                timer: 2000
            });
            return
        }
        if (!formDataExtracted.userToken.trim()) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "sin token no hay cambio",
                showConfirmButton: false,
                timer: 2000
            });
            return
        }
        //se hace la peticion al back
        try {
            let info = await changePassword(formDataExtracted)
            // console.log(info)
            if (info.message) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: info.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location.hash = "login"
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: info.error,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            console.log(error)
        }
    })
}