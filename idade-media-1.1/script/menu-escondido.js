/**
 * menu-escondido.js - Versão atualizada
 * Implementações:
 * 1. Menu sempre escondido por padrão em TODOS os tamanhos de tela
 * 2. Integração com CSS existente
 * 3. Transição suave ao abrir/fechar
 * 4. Fechamento ao clicar em links ou fora dele
 * 5. Acessibilidade melhorada
 */

document.addEventListener('DOMContentLoaded', function() {
    // Criar o botão de menu
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '&#9776;'; // Ícone de hambúrguer
    menuButton.className = 'menu-toggle';
    menuButton.id = 'menu-button';
    menuButton.setAttribute('aria-label', 'Menu de navegação');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.style.display = 'block'; // Garante que o botão esteja sempre visível
    
    // Inserir o botão antes do primeiro link
    nav.insertBefore(menuButton, nav.firstChild);
    
    // Criar container para os links
    const linksContainer = document.createElement('div');
    linksContainer.className = 'nav-links menu-hidden';
    linksContainer.id = 'menu-container';
    linksContainer.setAttribute('aria-hidden', 'true');
    
    // Mover todos os links para dentro do container
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(link => {
        linksContainer.appendChild(link);
    });
    
    // Adicionar o container após o botão
    nav.appendChild(linksContainer);
    
    // Função para alternar o menu
    function toggleMenu() {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        
        menuButton.setAttribute('aria-expanded', !isExpanded);
        linksContainer.setAttribute('aria-hidden', isExpanded);
        
        // Alterna as classes de acordo com o estado atual
        if (isExpanded) {
            linksContainer.classList.add('menu-hidden');
            linksContainer.classList.remove('active');
            menuButton.classList.remove('active');
        } else {
            linksContainer.classList.remove('menu-hidden');
            linksContainer.classList.add('active');
            menuButton.classList.add('active');
        }
    }
    
    // Adicionar evento de clique ao botão
    menuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });
    
    // Fecha o menu quando clicar em links
    links.forEach(link => {
        link.addEventListener('click', function() {
            menuButton.setAttribute('aria-expanded', 'false');
            linksContainer.setAttribute('aria-hidden', 'true');
            linksContainer.classList.add('menu-hidden');
            linksContainer.classList.remove('active');
            menuButton.classList.remove('active');
        });
    });
    
    // Fecha o menu quando clicar fora dele
    document.addEventListener('click', function(event) {
        const isMenuOpen = menuButton.getAttribute('aria-expanded') === 'true';
        const isClickInsideMenu = linksContainer.contains(event.target);
        const isClickOnButton = menuButton.contains(event.target);
        
        if (isMenuOpen && !isClickInsideMenu && !isClickOnButton) {
            toggleMenu();
        }
    });
    
    // Suporte para navegação por teclado (acessibilidade)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            toggleMenu();
        }
    });
    
    // Garante que o menu comece escondido independente do tamanho da tela
    linksContainer.classList.add('menu-hidden');
    linksContainer.classList.remove('active');
});