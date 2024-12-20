import { HOMEURL, LOGINURL, RECOVER_URL, REGISTERURL } from "./urlBackend.js";

export const registerNewUser = (packageSent) => {
    return fetch(REGISTERURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(packageSent)
    }).then((response) => {
        return response.json(); // Convertir la respuesta a JSON
    }).catch((error) => {
        console.error("Error en la petición de crear nuevo usuario: ", error);
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
        return response.json();
    }).catch((error) => {
        console.error("Error en la petición de ingreso de usuario", error);
    });
}

export const homeList = () => {
    const token = localStorage.getItem("token"); // Recuperar el token del almacenamiento
    return fetch(HOMEURL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Enviar el token en el encabezado
            "Content-Type": "application/json"
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error("Error en la petición GET en /home", error);
        });
}

export const addNewNote = (newNote) => {
    const token = localStorage.getItem("token");
    return fetch(HOMEURL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error("Error en la petición CREATE en /home", error);
        });
}

export const editNote = (noteToEdit, newQuery) => {
    const token = localStorage.getItem("token");
    return fetch(HOMEURL + `?editID=${newQuery}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteToEdit)
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error("Error en la petición UPDATE en /home", error);
        });
}

export const deleteNote = (newQuery) => {
    const token = localStorage.getItem("token");
    return fetch(HOMEURL + `?deleteID=${newQuery}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, // Enviar el token en el encabezado
            "Content-Type": "application/json"
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error("Error en la petición DELETE en /home", error);
        });
}

// verificar existencia de cuenta
export const verifyEmail = (newQuery) => {
    return fetch(RECOVER_URL + `?userEmail=${newQuery}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error("Error en la petición DELETE en /home", error);
        });
}

export const changePassword = (data) => {
    return fetch(RECOVER_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${data.userToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error("Error en la petición DELETE en /home", error);
        });
}

// Manejo del token
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