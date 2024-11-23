import { LOGINURL, REGISTERURL } from "./urlBackend.js";

export const registerNewUser = (packageSent) => {
    return fetch(REGISTERURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(packageSent)
    }).then((response) => {
        console.log("estado de la respuesta: ", response.status)
        if (!response.ok) {
            //throw new Error(`Error: ${response.status}`);
            return response.json();
        }
        return response.json(); // Convertir la respuesta a JSON
    }).catch((error) => {
        console.error("Error en la petición:", error);
    });
}

export const loginUser = (packageSent) => {
    return fetch(LOGINURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(packageSent)
    }).then((response) => {
        console.log("estado de la respuesta: ", response.status)
        return response.json(); // Convertir la respuesta a JSON
    }).catch((error) => {
        console.error("Error en la petición:", error);
    });
}

export const saveToken = (jwtX) => {
    localStorage.setItem('token', jwtX)
}

export const recoverToken = () => {
    if (localStorage.getItem("token")) {
        return localStorage.getItem("token")
    } else {
        console.log("no hay token")
    }
}

export const deleteToken = () => {
    localStorage.removeItem("token")
}