export const postRequest = (urlTo, packageSent) => {
    fetch(urlTo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(packageSent)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then((responseData) => {
            console.log("Respuesta del servidor:", responseData);
        })
        .catch((error) => {
            console.error("Error en la petición:", error);
        });
}