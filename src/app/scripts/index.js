import { HeaderComponent } from "./components/HeaderC.js";
import { divRoot } from "./helpers/dom.js";
import "./routes/Router.js"; //registrar el enrutador

const appState = {
    user: { name: "Usuario" },
    isLoggedIn: false,
    page: "Login"
};

document.addEventListener("DOMContentLoaded", () => {
    // primera carga
    divRoot.className = "h-100";
    divRoot.appendChild(HeaderComponent());
    const staticBox = document.createElement("div");
    staticBox.id = "staticBox";
    divRoot.appendChild(staticBox);
});