
var video = document.getElementById("video");
var playpauseButton = document.getElementById('playpause');
var videoContainer = document.querySelector('.video-container');
var timeoutId = null;
var reiniciarButton = document.getElementById('reiniciar');
var totalTimeDisplay = document.getElementById('totalTime');
var currentTimeDisplay = document.getElementById('currentTime');
var lefttimeButton = document.getElementById('lefttime');
var righttimeButton = document.getElementById('righttime');
var progress = document.getElementById('progress');
var fullScreenBtn = document.querySelector(".full-screen-btn");
var poster = document.querySelector('.poster');
var pularButton = document.getElementById('pular');
var buttons = document.querySelectorAll(".quality");
var currentSource = null; 
var currentTimeBackup = 0; 

var controlsPlayer = document.querySelector('.controlsplayer');
var inactivityTimeout; // Variável para armazenar o timeout
var isFirstPlay = true; // Variável para controlar se o primeiro play já aconteceu

function addOffModeClass() {
    if (!isFirstPlay) {
        controlsPlayer.classList.add('offmode');
    }
}

function removeOffModeClass() {
    controlsPlayer.classList.remove('offmode');
}

// Função para reiniciar o temporizador
function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(addOffModeClass, 3000); // 3000 milissegundos (3 segundos) de inatividade
}

// Função para remover a classe .offmode quando houver atividade
function handleActivity() {
    if (!isFirstPlay && controlsPlayer.classList.contains('offmode')) {
        removeOffModeClass();
    }
    resetInactivityTimer();
}

// Event listeners para detectar interações do usuário
document.addEventListener('mousemove', handleActivity);
document.addEventListener('mousedown', handleActivity);
document.addEventListener('keydown', handleActivity);

// Inicialmente, remove a classe .offmode
removeOffModeClass();

// Monitora eventos dentro de .controlsplayer para resetar o temporizador
controlsPlayer.addEventListener('mousemove', handleActivity);
controlsPlayer.addEventListener('mousedown', handleActivity);
controlsPlayer.addEventListener('keydown', handleActivity);


// qualidades
var moreButton = document.getElementById('more');
var viewModeElement = document.querySelector('.viewmode');

// Adiciona um evento de clique ao #more
moreButton.addEventListener('click', function() {
  // Adiciona a classe .m ao .viewmode
  viewModeElement.classList.add('m');
});

// Adiciona um evento de clique ao .viewmode
viewModeElement.addEventListener('click', function(event) {
  // Verifica se o clique ocorreu diretamente no .viewmode ou em um filho (excluindo <span>)
  if (event.target === viewModeElement) {
    viewModeElement.classList.remove('m');
  }
});


// reiniciar video
reiniciarButton.addEventListener('click', function() {
video.currentTime = 0;
video.pause();
video.play();
});

document.addEventListener('keydown', function(event) {
if (event.key === 'q' || event.key === 'Q') {
  reiniciarButton.click();
}
});


// velocidade do video
const speedBtn = document.querySelector(".speed-btn")
speedBtn.addEventListener("click", changePlaybackSpeed)
function changePlaybackSpeed() {
let newPlaybackRate = video.playbackRate + 0.25
if (newPlaybackRate > 2) newPlaybackRate = 0.25
video.playbackRate = newPlaybackRate
speedBtn.textContent = `${newPlaybackRate}x`
}




// Pular abertura
pularButton.addEventListener('click', function() {
pularButton.classList.add('p');
setTimeout(function() {
  pularButton.classList.remove('p');
}, 300);
pular();
});

document.addEventListener('keydown', function(event) {
if (event.key === 'p' || event.key === 'P') {
  pularButton.classList.add('p');
  setTimeout(function() {
      pularButton.classList.remove('p');
  }, 300);
  pular();
}
});

function pular() {
var currentTime = video.currentTime;
var novoTempo = currentTime + 85;
if (novoTempo <= video.duration) {
  video.currentTime = novoTempo;
} else {
  video.currentTime = video.duration;
}
}

// Controle de tela cheia via botão
fullScreenBtn.addEventListener("click", toggleFullScreenMode);

document.addEventListener("keydown", function(event) {
if (event.key === 'f' || event.key === 'F') {
  toggleFullScreenMode();
}
});

function toggleFullScreenMode() {
if (!document.fullscreenElement) {
  videoContainer.requestFullscreen();
} else {
  document.exitFullscreen();
}
}

document.addEventListener("fullscreenchange", () => {
if (document.fullscreenElement) {
  videoContainer.classList.add("full-screen");
  videoContainer.style.width = "100vw";
  videoContainer.style.height = "100vh";
} else {
  videoContainer.classList.remove("full-screen");
  videoContainer.style.width = null;
  videoContainer.style.height = null;
}
});

// timwline
progress.value = 0;

video.addEventListener('timeupdate', function() {
var currentTime = formatTime(video.currentTime);
var duration = formatTime(video.duration);
currentTimeDisplay.textContent = currentTime;
totalTimeDisplay.textContent = duration;

var progressValue = (video.currentTime / video.duration) * 100;
progress.value = progressValue;
});
function formatTime(time) {
var minutes = Math.floor(time / 60);
var seconds = Math.floor(time % 60);
return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

progress.addEventListener('input', function() {
var seekTo = video.duration * (progress.value / 100);
video.currentTime = seekTo;
});

progress.addEventListener('mouseup', function() {
progress.blur(); 
});

document.addEventListener('DOMContentLoaded', function() {
progress.value = 0;
});






// Buttons para avançar/retornar tempo
lefttimeButton.addEventListener('click', function() {
    video.currentTime -= 10;
});

righttimeButton.addEventListener('click', function() {
    video.currentTime += 10;
});

videoContainer.addEventListener('dblclick', function(event) {
    var clickedElement = event.target;

    // Verifica se o clique foi em um elemento que não deve ativar o duplo clique
    if (clickedElement.tagName !== 'BUTTON' && !clickedElement.closest('button')) {
        var containerWidth = videoContainer.offsetWidth;
        var clickX = event.clientX - videoContainer.getBoundingClientRect().left;

        if (clickX < containerWidth / 2) { // Clique na parte esquerda do container
            videoContainer.classList.add('leftt');
            videoContainer.classList.remove('rightt');
            lefttimeButton.click();
        } else { // Clique na parte direita do container
            videoContainer.classList.add('rightt');
            videoContainer.classList.remove('leftt');
            righttimeButton.click();
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function() {
            videoContainer.classList.remove('leftt', 'rightt');
        }, 300);
    }
});

document.addEventListener('keydown', function(event) {
    clearTimeout(timeoutId);

    if (event.target.tagName !== 'BUTTON' && !event.target.closest('button')) {
        if (event.keyCode === 37) { 
            lefttimeButton.click();
            videoContainer.classList.add('leftt');
            timeoutId = setTimeout(function() {
                videoContainer.classList.remove('leftt');
            }, 300);
        } else if (event.keyCode === 39) {
            righttimeButton.click();
            videoContainer.classList.add('rightt');
            timeoutId = setTimeout(function() {
                videoContainer.classList.remove('rightt');
            }, 300);
        }
    }
});

// Variável para controlar o primeiro play
var isFirstPlay = true;

// Função para adicionar a classe .v aos elementos quando ocorrer o primeiro play
function addVClassOnFirstPlay() {
    if (isFirstPlay) {
        document.querySelector('.topp').classList.add('v');
        document.querySelector('.endp').classList.add('v');
        document.querySelector('.progress').classList.add('v');
        document.getElementById('lefttime').classList.add('v');
        document.getElementById('righttime').classList.add('v');
        isFirstPlay = false; // Marca que o primeiro play já aconteceu
    }
}

// Play e Pause
playpauseButton.addEventListener('click', function() {
    if (video.paused || video.ended) {
        video.play();
        playpauseButton.classList.add('pause');
        poster.style.display = 'none'; // Oculta o poster ao iniciar a reprodução
        addVClassOnFirstPlay(); // Adiciona a classe .v quando ocorre o primeiro play
        isFirstPlay = false; // Marca que o primeiro play já aconteceu
        removeOffModeClass(); // Remove .offmode ao iniciar o primeiro play
    } else {
        video.pause();
        playpauseButton.classList.remove('pause');
    }
});

video.addEventListener('play', function() {
    playpauseButton.classList.add('pause');
    poster.style.display = 'none';
    addVClassOnFirstPlay(); // Adiciona a classe .v quando ocorre o primeiro play
});

video.addEventListener('pause', function() {
    playpauseButton.classList.remove('pause');
});

  
video.addEventListener('play', function() {
    playpauseButton.classList.add('pause');
    poster.style.display = 'none'; 
});

video.addEventListener('pause', function() {
    playpauseButton.classList.remove('pause');
});


  
  
  
  
// Adiciona a funcionalidade de play/pause usando a tecla Space
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) { // Tecla Space
        event.preventDefault(); // Previne a ação padrão da tecla (ex: scroll down)
        if (video.paused || video.ended) {
            video.play();
            playpauseButton.classList.add('pause');
            poster.style.display = 'none'; // Oculta o poster ao iniciar a reprodução
            addVClassOnFirstPlay(); // Adiciona a classe .v quando ocorre o primeiro play
        } else {
            video.pause();
            playpauseButton.classList.remove('pause');
        }
    }
});


// Seleciona elementos relevantes
var video = document.getElementById('video');
var buttons = document.querySelectorAll('.quality');
var downloadLink = document.querySelector('.download');
var currentSource = null;
var currentTimeBackup = 0;

// Função para carregar o vídeo com o data-source especificado
function loadVideo(sourceUrl) {
  if (!sourceUrl) {
    // Se o data-source estiver vazio, tenta encontrar o próximo botão com data-source
    var nextButton = findNextButtonWithSource();
    if (nextButton) {
      sourceUrl = nextButton.getAttribute("data-source");
    }
  }

  if (currentSource && currentSource !== sourceUrl) {
    currentTimeBackup = video.currentTime;
  }

  video.src = sourceUrl;
  currentSource = sourceUrl;

  buttons.forEach((button) => {
    if (button.getAttribute("data-source") === sourceUrl) {
      button.classList.add("p");
      downloadLink.href = sourceUrl; // Define o href do link de download
      downloadLink.classList.add("p1"); // Adiciona a classe .p1 ao link de download
      downloadLink.classList.add("p" + button.classList[1]); // Adiciona a classe específica de qualidade ao link de download
    } else {
      button.classList.remove("p");
    }

    // Oculta o botão se não tiver data-source
    if (button.getAttribute("data-source") === "") {
      button.style.display = "none";
    } else {
      button.style.display = "inline-block"; // Garante que os botões visíveis tenham display correto
    }
  });

  if (Hls.isSupported() && sourceUrl.endsWith(".m3u8")) {
    var hls = new Hls();
    hls.loadSource(sourceUrl);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      if (currentTimeBackup > 0) {
        video.currentTime = currentTimeBackup;
        currentTimeBackup = 0;
      }
      video.play();
    });
  } else {
    video.addEventListener("loadedmetadata", function () {
      if (currentTimeBackup > 0) {
        video.currentTime = currentTimeBackup;
        currentTimeBackup = 0;
      }
      video.play();
    });
  }
}

// Função para encontrar o próximo botão com data-source
function findNextButtonWithSource() {
  var foundNext = false;
  for (var i = 0; i < buttons.length - 1; i++) {
    if (buttons[i].getAttribute("data-source") === "" && buttons[i + 1].getAttribute("data-source") !== "") {
      foundNext = true;
      return buttons[i + 1];
    }
  }
  return null;
}

// Verifica se há botões para inicializar o vídeo
if (buttons.length > 0) {
  var firstButton = buttons[0];
  var sourceUrl = firstButton.getAttribute("data-source");
  loadVideo(sourceUrl);
}

// Adiciona eventos de clique aos botões
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var sourceUrl = this.getAttribute("data-source");
    loadVideo(sourceUrl);
  });
});
