// Router.js

import { loginView } from "../pages/LoginP.js";
import { RegisterView } from "../pages/RegisterP.js";
import { HomeView } from "../pages/HomeP.js";
import { RecoverView } from "../pages/RecoverP.js";

const routes = {
    "#login": loginView,
    "#register": RegisterView,
    "#recover": RecoverView,
    "#home": HomeView,
    "": loginView, // Ruta por defecto
};

export const updateView = () => {
    const hash = window.location.hash;
    const view = routes[hash] || loginView;
    view();
};

// Escuchar eventos
window.addEventListener("hashchange", updateView); // Cambios en el hash
window.addEventListener("DOMContentLoaded", updateView); // Carga inicial