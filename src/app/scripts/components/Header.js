import { divRoot } from "../helpers/dom.js";
import { HomeView } from "../pages/home.js";
import { loginView } from "../pages/login.js";
import { RegisterView } from "../pages/register.js";

export const Header = (props) => {
    let { page } = props;
    let nav = document.createElement('nav');

    nav.innerHTML = `
        <ul class="nav d-flex flex-row justify-content-center text-white">
            <li class="nav-item mx-3">Home</li>
            <li class="nav-item mx-3">Register</li>
            <li class="nav-item mx-3">Login</li>
            <li class="nav-item mx-3 collapse">Logout</li>
        </ul>
    `

    nav.className = "navbar navbar-expand-md bg-dark";
    nav.id = "mainHeader"

    // nav.addEventListener("click", (e) => {
    //     console.log("antes: ", page)
    //     let itemSelected = e.target.innerText;
    //     page = itemSelected;
    //     console.log("despues: ", page)
    // })

    nav.addEventListener('click', (e) => {
        let itemSelected = e.target.className;
        console.log(itemSelected)
        // console.log(typeof (itemSelected))
        if (itemSelected.includes("nav-item")) {
            // console.log(e.target.innerText)
            page = e.target.innerText
        }
        divRoot.innerHTML = ``;
        divRoot.appendChild(nav)

        switch (page) {
            case "Register":
                RegisterView()
                break;
            case "Login":
                loginView()
                break;
            case "Home":
                HomeView()
                break;
            default:
                console.log("aun no esta")
        }
    })
    return nav
}