// Crie um arquivo chamado page-components.js com este código
document.addEventListener('DOMContentLoaded', function() {
  // Inserir o header e nav
  function includeHeaderNav() {
    const headerNavHTML = `
    <header>
        <p>A HISTÓRIA</p>
    </header>
    <nav>
        <a href="index.html" title="Página Inicial">PAGINA INICIAL</a>
        <a href="resumo.html" title="Resumo da história">RESUMO DO PERIODO PÓS-ROMANO</a>
        <a href="timeline.html" title="Linha do Tempo">LINHA DO TEMPO</a>
        <a href="personagens.html" title="Personagens Importantes">PERSONAGENS IMPORTANTES</a>
        <a href="reinos.html" title="Reinos Medievais">REINOS APOS A QUEDA DE ROMA</a>
        <a href="culturas.html" title="Classes culturais">CLASSES CULTURAIS</a>
        <a href="#contato" title="Entre em Contato">CONTATO</a>
    </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', headerNavHTML);
  }
  
  // Inserir o footer
  function includeFooter() {
    const footerHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>A HISTÓRIA</h3>
                <p>Um projeto educacional sobre história medieval.</p>
            </div>
            <div class="footer-section">
                <h3>Links Rápidos</h3>
                <ul>
                    <li><a href="home.html">Home</a></li>
                    <li><a href="resumo.html">Resumo</a></li>
                    <li><a href="#timeline">Timeline</a></li>
                    <li><a href="#personagens">Personagens</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Contato</h3>
                <p>Email: contato@ahistoria.com</p>
                <p>Telefone: (00) 0000-0000</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} A HISTÓRIA - Todos os direitos reservados</p>
        </div>
    </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  
  // Destacar página atual no menu
  function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
  
  // Executar todas as funções
  includeHeaderNav();
  includeFooter();
  highlightCurrentPage();
});