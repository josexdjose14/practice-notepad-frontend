import { moveOut } from "../helpers/headerChanger.js";

export const HeaderComponent = () => {
    let nav = document.createElement('nav');
    nav.className = "navbar navbar-expand-md bg-dark";
    nav.id = "mainHeader";
    nav.innerHTML = `
        <ul class="nav d-flex flex-row justify-content-center text-white">
            <li class="nav-item mx-3 ${window.location.hash === "#home" ? "" : "collapse"}" data-route="#home">Home</li>
            <li class="nav-item mx-3 ${window.location.hash === "#home" ? "collapse" : ""}" data-route="#register">Register</li>
            <li class="nav-item mx-3 ${window.location.hash === "#home" ? "collapse" : ""}" data-route="#login">Login</li>
            <li class="nav-item mx-3 ${window.location.hash === "#home" ? "" : "collapse"}" data-route="#logout">Logout</li>
        </ul>
    `;

    nav.addEventListener('click', (e) => {

        if (e.target.classList.contains("nav-item") && e.target.dataset.route === "#logout") {
            // console.log("saliendo de home")
            moveOut();
        } else if (e.target.classList.contains("nav-item")) {
            const route = e.target.getAttribute("data-route");
            // console.log(route)
            window.location.hash = route;
        }
    });

    return nav
}