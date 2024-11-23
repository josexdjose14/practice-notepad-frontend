import { Header } from "./components/Header.js";
import { divRoot } from "./helpers/dom.js";
import { loginView } from "./pages/login.js";

const appState = {
    user: { name: "Usuario" },
    isLoggedIn: false,
    page: "Login"
};

document.addEventListener('DOMContentLoaded', () => {
    //carga inicial
    divRoot.className = "h-100"
    divRoot.appendChild(Header(appState))
    //se crea un div estatico para cambiarlo mas facil
    //const fragment = document.createDocumentFragment();
    const staticBox = document.createElement("div");
    staticBox.id = "staticBox";
    divRoot.appendChild(staticBox)

    loginView()
})