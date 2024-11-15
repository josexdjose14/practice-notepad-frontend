export const Header = () => {
    let nav = document.createElement('nav');

    nav.innerHTML = `
        <ul class="nav d-flex flex-row justify-content-center text-white">
            <li class="nav-item mx-3">Home</li>
            <li class="nav-item mx-3">Register</li>
            <li class="nav-item mx-3">Login</li>
            <li class="nav-item mx-3 collapse">Logout</li>
        </ul>
    `

    nav.className = "navbar navbar-expand-md bg-dark"

    return nav
}