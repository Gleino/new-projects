// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Função para adicionar a classe que ativa a animação
function handleScrollAnimation() {
    // Seleciona todas as sections com class="img"
    const sections = document.querySelectorAll('section.img');
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        
        if (heading && isElementInViewport(section)) {
            heading.classList.add('visible');
        }
    });
}

// Adiciona o CSS necessário dinamicamente
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        section.img h2 {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 1.2s ease-out, transform 1.2s ease-out;
        }
        
        section.img h2.visible {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(styleSheet);
}

// Inicializa o script quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    
    // Verifica elementos visíveis ao carregar a página
    handleScrollAnimation();
    
    // Adiciona listener para o evento de scroll
    window.addEventListener('scroll', handleScrollAnimation, { passive: true });
});