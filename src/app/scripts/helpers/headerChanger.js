import { deleteToken } from "./requests.js";

// con usuario
export const moveIn = () => {
    const navBox = document.querySelector("#mainHeader");
    navBox.children[0].children[0].className = "nav-item mx-3"; //home
    navBox.children[0].children[1].className = "nav-item mx-3 collapse"; //register
    navBox.children[0].children[2].className = "nav-item mx-3 collapse"; //login
    navBox.children[0].children[3].className = "nav-item mx-3";; //logout
    window.location.hash = "home"
}

// sin usuario
export const moveOut = () => {
    deleteToken(); //borra el token
    const navBox = document.querySelector("#mainHeader"); //captura el header
    navBox.children[0].children[0].className = "nav-item mx-3 collapse"; //home
    navBox.children[0].children[1].className = "nav-item mx-3"; //register
    navBox.children[0].children[2].className = "nav-item mx-3"; //login
    navBox.children[0].children[3].className = "nav-item mx-3 collapse"; //logout
    window.location.hash = "#login"; //cambia la vista a login
}