import { Header } from "./components/Header.js";
import { divRoot } from "./helpers/dom.js";
import { HomeView } from "./pages/home.js";
import { loginView } from "./pages/login.js";
import { RegisterView } from "./pages/register.js";

const appState = {
    user: { name: "Usuario" },
    isLoggedIn: false,
    page: "Login"
};

document.addEventListener('DOMContentLoaded', () => {
    divRoot.className = "h-100"
    divRoot.appendChild(Header())
    loginView()
})

document.addEventListener('click', (e) => {
    let itemSelected = e.target.className;
    // console.log(itemSelected)
    // console.log(typeof (itemSelected))
    if (itemSelected.includes("nav-item")) {
        // console.log(e.target.innerText)
        appState.page = e.target.innerText
    }
    divRoot.innerHTML = ``;
    divRoot.appendChild(Header())

    switch (appState.page) {
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

