document.addEventListener('DOMContentLoaded', function() {
    // Criar o botão de menu
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '&#9776;'; // Ícone de hambúrguer
    menuButton.className = 'menu-toggle';
    menuButton.setAttribute('aria-label', 'Menu de navegação');
    
    // Inserir o botão antes do primeiro link
    nav.insertBefore(menuButton, nav.firstChild);
    
    // Criar container para os links
    const linksContainer = document.createElement('div');
    linksContainer.className = 'nav-links';
    
    // Mover todos os links para dentro do container
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(link => {
        linksContainer.appendChild(link);
    });
    
    // Adicionar o container após o botão
    nav.appendChild(linksContainer);
    
    // Adicionar evento de clique ao botão
    menuButton.addEventListener('click', function() {
        linksContainer.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
});