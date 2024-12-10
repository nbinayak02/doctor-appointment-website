const menuButton = document.querySelector("nav .menus #menu-icon");
const dropdown = document.querySelector(".menu-dropdown");
const menuIcon = document.querySelector("nav .menus #menu-icon .bx");
var isMenuClicked = false;


function showDropdown() {
    if (!isMenuClicked) {
        dropdown.style.display = "block";
        isMenuClicked = true;
        menuIcon.classList.remove("bx-menu");
        menuIcon.classList.add("bx-x");

    } else {
        dropdown.style.display = "none";
        isMenuClicked = false;
        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");

    }
}

function hideDropdownOnResize() {
    if (window.innerWidth > 500) {
        dropdown.style.display = "none";
        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");
    }
}

menuButton.addEventListener("click", showDropdown);
window.addEventListener("resize", hideDropdownOnResize);