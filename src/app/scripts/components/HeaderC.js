import { deleteToken } from "../helpers/requests.js";

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
    console.log("el nav tiene:", nav.children[0].children[0].classList.add = "collapse")

    nav.addEventListener('click', (e) => {

        if (e.target.classList.contains("nav-item") && e.target.dataset.route === "#logout") {
            console.log("saliendo de home")
            deleteToken();
            console.log("el home es: ", nav.children[0].children[0])
            nav.children[0].children[0].className = "nav-item mx-3 collapse"; //home
            nav.children[0].children[1].className = "nav-item mx-3"; //register
            nav.children[0].children[2].className = "nav-item mx-3"; //login
            nav.children[0].children[3].className = "nav-item mx-3 collapse"; //logout
            window.location.hash = "#login";
        } else if (e.target.classList.contains("nav-item")) {
            const route = e.target.getAttribute("data-route");
            console.log(route)
            window.location.hash = route;
        }
    });

    return nav
}