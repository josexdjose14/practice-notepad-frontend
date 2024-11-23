const routes = {
    "/": HomeView,
    "/login": loginView,
    "/register": RegisterView,
};

const navigateTo = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    updateView(path);
};

const updateView = (path) => {
    const viewFunction = routes[path];
    if (viewFunction) {
        viewFunction();
    } else {
        console.error("Ruta no encontrada:", path);
    }
};

window.addEventListener("popstate", () => {
    updateView(window.location.pathname);
});

export { navigateTo, updateView };