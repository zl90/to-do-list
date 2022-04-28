import './style.css';

const sidebar = document.querySelector('.sidebar-container');
const hamburgerMenuButton = document.querySelector('.hamburger-menu');
hamburgerMenuButton.addEventListener('click', toggleSidebar);

function toggleSidebar () {
    if (sidebar.style.display !== 'flex') {
        sidebar.style.display = 'flex';
    } else {
        sidebar.style.display = 'none';
    }
}