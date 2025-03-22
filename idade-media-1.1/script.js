// Script para adicionar interatividade à página da Idade Média

document.addEventListener('DOMContentLoaded', function() {
    // 1. Adicionar IDs para as seções que faltam
    const sections = document.querySelectorAll('section.img');
    const sectionIds = ['roma', 'rbarb', 'bizan', 'arab', 'igreja', 'carolingia', 'renascimento', 'desagregacao'];
    
    sections.forEach((section, index) => {
        if (!section.id && index < sectionIds.length) {
            section.id = sectionIds[index];
        }
    });

    // 2. Criar tabela de conteúdo
    createTableOfContents();
    
    // 3. Adicionar efeito de parallax nas imagens
    enhanceParallax();
    
    // 4. Adicionar animação de fade-in aos parágrafos durante scroll
    addScrollAnimations();
    
    // 5. Adicionar menu mobile responsivo
    setupMobileMenu();
    
    // 6. Adicionar botão "Voltar ao topo"
    createBackToTopButton();
});

// Função para criar tabela de conteúdo
function createTableOfContents() {
    // Criar elemento da tabela de conteúdo
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    
    // Botão para abrir/fechar
    const tocBtn = document.createElement('div');
    tocBtn.className = 'toc-btn';
    tocBtn.innerHTML = '<i class="fas fa-list"></i>';
    toc.appendChild(tocBtn);
    
    // Título
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = 'Conteúdo';
    toc.appendChild(tocTitle);
    
    // Lista de seções
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    // Obter todas as seções com imagens e adicionar à lista
    const sections = document.querySelectorAll('section.img');
    sections.forEach(section => {
        if (section.querySelector('h2')) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.textContent = section.querySelector('h2').textContent;
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        }
    });
    
    toc.appendChild(tocList);
    document.body.appendChild(toc);
    
    // Evento de clique para mostrar/esconder a tabela de conteúdo
    tocBtn.addEventListener('click', function() {
        toc.classList.toggle('active');
    });
}

// Função para melhorar o efeito parallax
function enhanceParallax() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section.img');
        sections.forEach(section => {
            const position = section.getBoundingClientRect();
            
            // Se a seção estiver visível na tela
            if (position.top < window.innerHeight && position.bottom >= 0) {
                const speed = 0.5;
                const yPos = -(window.scrollY * speed) % window.innerHeight;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

// Função para adicionar animações de scroll
function addScrollAnimations() {
    const paragraphs = document.querySelectorAll('main p');
    
    // Adicionar classe para estilização inicial (invisível)
    paragraphs.forEach(p => {
        p.classList.add('fade-in');
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Função para verificar se o elemento está visível
    function checkVisibility() {
        paragraphs.forEach(p => {
            const position = p.getBoundingClientRect();
            
            // Se o elemento estiver visível na tela
            if (position.top < window.innerHeight - 50) {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Verificar visibilidade no carregamento e durante o scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verificar imediatamente após o carregamento
}

// Função para configurar menu mobile responsivo
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    
    // Criar botão de menu mobile
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Estruturar links de navegação em um container
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Mover os links existentes para o novo container
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(link => {
        navLinks.appendChild(link.cloneNode(true));
        link.remove();
    });
    
    // Adicionar elementos ao nav
    nav.appendChild(navLinks);
    nav.appendChild(mobileMenuBtn);
    
    // Adicionar evento de clique para mostrar/esconder menu em dispositivos móveis
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Adicionar CSS necessário dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
                padding: 10px;
            }
            
            .nav-links {
                position: absolute;
                flex-direction: column;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--cor-cont);
                padding: 0;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            .nav-links.active {
                max-height: 200px;
                padding: 10px 0;
            }
            
            .nav-links a {
                padding: 10px 20px;
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para criar botão de voltar ao topo
function createBackToTopButton() {
    const btnTop = document.createElement('button');
    btnTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btnTop.className = 'back-to-top';
    btnTop.style.display = 'none';
    document.body.appendChild(btnTop);
    
    // Adicionar CSS necessário
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--cor-cont);
            color: var(--cor-ama);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            z-index: 99;
        }
        
        .back-to-top:hover {
            background-color: var(--cor-ama);
            color: var(--cor-cont);
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar/esconder botão com base na posição do scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btnTop.style.display = 'flex';
        } else {
            btnTop.style.display = 'none';
        }
    });
    
    // Evento de clique para voltar ao topo
    btnTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Função para adicionar indicadores de leitura
function addReadingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'reading-progress';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background-color: var(--cor-ama);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        
        const width = (scrolled / fullHeight) * 100;
        indicator.style.width = `${width}%`;
    });
}

// Executar a função adicional
addReadingIndicator();