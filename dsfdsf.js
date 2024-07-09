  
 // Episodios progressão
 document.addEventListener('DOMContentLoaded', function() {
    var totalCounts = document.querySelectorAll('.total-count');
 
    totalCounts.forEach(function(totalCount) {
        var count = document.querySelectorAll('.vieweP').length;
        totalCount.textContent = count;
    });
 });
 
    
    
 document.addEventListener('DOMContentLoaded', function() {
    var containers = document.querySelectorAll('.container');
 
    containers.forEach(function(container) {
        var containerId = container.getAttribute('data-id');
        var buttons = document.querySelectorAll('.vieweP');  // Atualizado para selecionar todos os .vieweP no documento
        var progressBar = container.querySelector('.progress-fill');
        var secepButton = container.querySelector('#secep');
        var progressText = container.querySelector('.porceps h3');
        var markedCountText = container.querySelector('.marked-count');
        var totalCountText = container.querySelector('.total-count');
 
        // Initialize total count
        totalCountText.textContent = buttons.length;
     
        // Load the state of the buttons from localStorage
        function loadButtonState() {
            buttons.forEach(function(button) {
                var buttonId = button.getAttribute('data-id');
                var state = localStorage.getItem(containerId + '-' + buttonId);
                if (state === 'visto') {
                    button.classList.add('visto');
                }
            });
            updateProgressBar();
        }
 
        // Save the state of the buttons to localStorage
        function saveButtonState(button) {
            var buttonId = button.getAttribute('data-id');
            if (button.classList.contains('visto')) {
                localStorage.setItem(containerId + '-' + buttonId, 'visto');
            } else {
                localStorage.removeItem(containerId + '-' + buttonId);
            }
        }
 
        function updateProgressBar() {
            var total = buttons.length;
            var marked = document.querySelectorAll('.vieweP.visto').length;  // Atualizado para selecionar todos os .vieweP marcados no documento
            var percentage = (marked / total) * 100;
            progressBar.style.width = percentage + '%';
            progressText.textContent = 'Anime Finalizado ' + Math.round(percentage) + '%';
            markedCountText.textContent = marked;
 
            // Check if all buttons are marked
            if (marked === total) {
                secepButton.classList.add('studo');
            } else {
                secepButton.classList.remove('studo');
            }
        }
 
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                button.classList.toggle('visto');
                saveButtonState(button);
                updateProgressBar();
            });
        });
 
        secepButton.addEventListener('click', function() {
            var allMarked = Array.from(buttons).every(button => button.classList.contains('visto'));
            if (secepButton.classList.contains('studo') && allMarked) {
                buttons.forEach(function(button) {
                    button.classList.remove('visto');
                    saveButtonState(button);
                });
                secepButton.classList.remove('studo');
            } else {
                buttons.forEach(function(button) {
                    button.classList.add('visto');
                    saveButtonState(button);
                });
                secepButton.classList.add('studo');
            }
            updateProgressBar();
        });
 
        loadButtonState(); // Initial load of button states and progress bar
    });
 });
 
      
 
    
    // imagens dos eps
    document.addEventListener('DOMContentLoaded', function() {
            // Seleciona todos os elementos com a classe .imgC
            var imgCs = document.querySelectorAll('.imgC');
 
            // Verifica se o src da classe .imgC está vazio
            imgCs.forEach(function(imgC) {
                if (imgC.getAttribute('src') === '') {
                    // Atribui o src da .capa img para .imgC
                    imgC.setAttribute('src', document.querySelector('.capa img').getAttribute('src'));
                }
            });
        });
    
    // temporadas
   document.addEventListener('DOMContentLoaded', function() {
            const spans = document.querySelectorAll('.listtemporadas span');
            const listeps = document.querySelectorAll('.listeps');
 
            spans.forEach(span => {
                span.addEventListener('click', function() {
                    // Remover a classe .clicked de todos os spans
                    spans.forEach(s => s.classList.remove('clicked'));
                    
                    // Adicionar a classe .clicked ao span clicado
                    span.classList.add('clicked');
 
                    // Esconder todos os elementos listeps
                    listeps.forEach(list => list.classList.remove('active'));
 
                    // Mostrar o elemento correspondente
                    const seasonId = `season-${span.getAttribute('data-season')}`;
                    const seasonElement = document.getElementById(seasonId);
                    if (seasonElement) {
                        seasonElement.classList.add('active');
                    }
                });
            });
 
            // Ativar a temporada 01 por padrão ao carregar a página
            document.getElementById('season-01').classList.add('active');
 
            // Adicionar número da temporada aos episódios
            listeps.forEach(list => {
                const seasonNumber = list.id.split('-')[1];
                const episodes = list.querySelectorAll('.episodio .seasonN');
                episodes.forEach(episode => {
                    episode.textContent = `Temporada ${seasonNumber}`;
                });
            });
        });
    
    // scroll das temporadas 
    document.addEventListener('DOMContentLoaded', function() {
            const scrollLeftButton = document.getElementById('scrollLeft');
            const scrollRightButton = document.getElementById('scrollRight');
            const listTemporadas = document.querySelector('.listtemporadas');
 
            scrollLeftButton.addEventListener('click', function() {
                listTemporadas.scrollBy({
                    left: -400, // Ajuste o valor conforme necessário
                    behavior: 'smooth'
                });
            });
 
            scrollRightButton.addEventListener('click', function() {
                listTemporadas.scrollBy({
                    left: 400, // Ajuste o valor conforme necessário
                    behavior: 'smooth'
                });
            });
        });
    
 
 // Barra de pesquisa ep
 document.addEventListener('DOMContentLoaded', function() {
        const searchBar = document.querySelector('.search-bar');
        const episodios = document.querySelectorAll('.episodio');
 
        searchBar.addEventListener('input', function() {
            const searchTerm = searchBar.value.trim().toLowerCase();
 
            episodios.forEach(episodio => {
                const epNN = episodio.querySelector('.epNN').textContent.trim().toLowerCase();
 
                if (epNN.includes(searchTerm)) {
                    episodio.style.display = 'flex'; // Exibe o episódio se corresponder ao termo de pesquisa
                } else {
                    episodio.style.display = 'none'; // Oculta o episódio se não corresponder ao termo de pesquisa
                }
            });
        });
    });
 
 
    // Seasons Number
     document.addEventListener('DOMContentLoaded', function() {
            const seasonN = document.getElementById('seasonN');
            const listtemporadas = document.querySelector('.listtemporadas');
            const spanCount = listtemporadas.querySelectorAll('span').length;
 
            // Calcula o valor final para ser exibido no #seasonN
            const finalValue = spanCount - 1;
 
            // Define o conteúdo de #seasonN para o valor final calculado
            seasonN.textContent = finalValue;
        });
   