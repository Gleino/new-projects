// Script para a barra lateral moderna

document.addEventListener('DOMContentLoaded', function() {
    // Criar a estrutura da barra lateral
    createModernSidebar();
    
    // Configurar os eventos de interação
    setupSidebarInteractions();
    
    // Adicionar classe ativa ao item de menu atual
    highlightCurrentSection();
    
    // Atualizar a classe ativa durante o scroll
    window.addEventListener('scroll', highlightCurrentSection);
});

// Função para criar a estrutura da barra lateral
function createModernSidebar() {
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Criar botão para abrir a barra lateral
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-sidebar';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(toggleBtn);
    
    // Criar estrutura da barra lateral
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    
    // Cabeçalho da barra lateral
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'sidebar-header';
    
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.textContent = 'Idade Média';
    sidebarHeader.appendChild(sidebarTitle);
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-sidebar';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    sidebarHeader.appendChild(closeButton);
    
    sidebar.appendChild(sidebarHeader);
    
    // Conteúdo da barra lateral
    const sidebarContent = document.createElement('div');
    sidebarContent.className = 'sidebar-content';
    
    // Navegação principal
    const mainNav = document.createElement('ul');
    mainNav.className = 'sidebar-nav';
    
    // Itens de navegação
    addSidebarItem(mainNav, 'home', 'Home', 'fa-home');
    
    // Adicionar submenu "Períodos"
    const periodsItem = document.createElement('li');
    periodsItem.className = 'sidebar-nav-item';
    
    const periodsToggle = document.createElement('a');
    periodsToggle.href = '#';
    periodsToggle.className = 'sidebar-nav-link submenu-toggle';
    periodsToggle.innerHTML = '<i class="fas fa-clock"></i>Períodos <i class="fas fa-chevron-down"></i>';
    periodsItem.appendChild(periodsToggle);
    
    const periodsSubmenu = document.createElement('div');
    periodsSubmenu.className = 'submenu';
    
    const periodsSubmenuList = document.createElement('ul');
    periodsSubmenuList.className = 'sidebar-nav';
    
    // Capturar todas as seções e criar itens de menu para cada uma
    const sections = document.querySelectorAll('section.img');
    sections.forEach(section => {
        if (section.id && section.querySelector('h2')) {
            const title = section.querySelector('h2').textContent.trim();
            const iconClass = getSectionIcon(section.id);
            
            const submenuItem = document.createElement('li');
            submenuItem.className = 'submenu-item';
            
            const submenuLink = document.createElement('a');
            submenuLink.href = `#${section.id}`;
            submenuLink.className = 'submenu-link';
            submenuLink.textContent = title;
            
            submenuItem.appendChild(submenuLink);
            periodsSubmenuList.appendChild(submenuItem);
        }
    });
    
    periodsSubmenu.appendChild(periodsSubmenuList);
    periodsItem.appendChild(periodsSubmenu);
    mainNav.appendChild(periodsItem);
    
    // Adicionar outros itens de menu
    addSidebarItem(mainNav, 'timeline', 'Timeline', 'fa-timeline');
    addSidebarItem(mainNav, 'maps', 'Mapas', 'fa-map');
    addSidebarItem(mainNav, 'characters', 'Personagens', 'fa-user');
    addSidebarItem(mainNav, 'events', 'Eventos', 'fa-calendar-alt');
    
    sidebarContent.appendChild(mainNav);
    sidebar.appendChild(sidebarContent);
    
    // Rodapé da barra lateral
    const sidebarFooter = document.createElement('div');
    sidebarFooter.className = 'sidebar-footer';
    sidebarFooter.textContent = '© 2025 Gleino Monteiro';
    sidebar.appendChild(sidebarFooter);
    
    document.body.appendChild(sidebar);
}

// Função auxiliar para adicionar itens à barra lateral
function addSidebarItem(parent, id, text, iconClass) {
    const item = document.createElement('li');
    item.className = 'sidebar-nav-item';
    
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.className = 'sidebar-nav-link';
    link.innerHTML = `<i class="fas ${iconClass}"></i>${text}`;
    
    item.appendChild(link);
    parent.appendChild(item);
    
    return item;
}

// Função para determinar ícone com base no ID da seção
function getSectionIcon(sectionId) {
    const icons = {
        'roma': 'fa-monument',
        'rbarb': 'fa-horse',
        'bizan': 'fa-cross',
        'arab': 'fa-mosque',
        'igreja': 'fa-church',
        'carolingia': 'fa-crown',
        'renascimento': 'fa-book',
        'desagregacao': 'fa-broken-columns'
    };
    
    return icons[sectionId] || 'fa-scroll';
}

// Configurar interações da barra lateral
function setupSidebarInteractions() {
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const closeBtn = document.querySelector('.close-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('main');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    // Abrir barra lateral
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        mainContent.classList.add('sidebar-active');
    });
    
    // Fechar barra lateral (botão e overlay)
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
    }
    
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Abrir/fechar submenus
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Alternar classe 'open' no toggle
            this.classList.toggle('open');
            
            // Encontrar o submenu relacionado
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('open');
        });
    });
    
    // Fechar a barra lateral ao clicar em um link de submenu
    const submenuLinks = document.querySelectorAll('.submenu-link');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Pequeno atraso para a animação de rolagem funcionar antes de fechar
            setTimeout(closeSidebar, 300);
        });
    });
}

// Destacar a seção atual durante o scroll
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section.img');
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Detectar a seção visível atual
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
            currentSectionId = section.id;
        }
    });
    
    // Remover classe ativa de todos os links
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Adicionar classe ativa ao link atual
    if (currentSectionId) {
        const activeLink = document.querySelector(`.submenu-link[href="#${currentSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Abrir o submenu que contém o link ativo, se não estiver aberto
            const parentSubmenu = activeLink.closest('.submenu');
            if (parentSubmenu && !parentSubmenu.classList.contains('open')) {
                parentSubmenu.classList.add('open');
                const toggle = parentSubmenu.previousElementSibling;
                if (toggle) {
                    toggle.classList.add('open');
                }
            }
        }
    }
}

// Adicionar tema escuro/claro
function addThemeToggle() {
    // Criar item de alternância de tema
    const themeItem = document.createElement('li');
    themeItem.className = 'sidebar-nav-item theme-toggle';
    
    const themeBtn = document.createElement('a');
    themeBtn.href = '#';
    themeBtn.className = 'sidebar-nav-link';
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>Modo Escuro';
    
    themeItem.appendChild(themeBtn);
    document.querySelector('.sidebar-nav').appendChild(themeItem);
    
    // Verificar se já tem tema escuro
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>Modo Claro';
    }
    
    // Adicionar evento para alternar tema
    themeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'true');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>Modo Claro';
        } else {
            localStorage.setItem('darkMode', 'false');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>Modo Escuro';
        }
    });
}

// Executar a função de tema
setTimeout(addThemeToggle, 100);