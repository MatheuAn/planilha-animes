
var video = document.getElementById("video");
var playpauseButton = document.getElementById('playpause');
var videoContainer = document.querySelector('.video-container');
var timeoutId = null;
var reiniciarButton = document.getElementById('reiniciar');
var lefttimeButton = document.getElementById('lefttime');
var righttimeButton = document.getElementById('righttime');
var fullScreenBtn = document.querySelector(".full-screen-btn");
var volumeButton = document.getElementById('volume');
var poster = document.querySelector('.poster');
var pularButton = document.getElementById('pular');
var buttons = document.querySelectorAll(".quality");
var currentSource = null; 
var currentTimeBackup = 0; 


// volume lateral
const vol = document.getElementById('vol');
const handlevol = document.getElementById('handlevol');
const volnumb = document.getElementById('volnumb');
const icvol = document.querySelector('.icvol');

const initialVolume = 100;
document.getElementById('barvol').style.height = `${initialVolume}%`;
handlevol.style.bottom = `${initialVolume}%`;
volnumb.textContent = `${initialVolume}%`;

function updateVideoVolume() {
    const currentHeight = parseFloat(document.getElementById('barvol').style.height) || 0;
    const percentage = currentHeight / 100;

    video.volume = percentage;

    if (percentage === 0) {
        icvol.classList.add('zerob');
        video.muted = true;  
        volumeButton.classList.add('vol');
    } else {
        icvol.classList.remove('zerob');
        video.muted = false;  
        volumeButton.classList.remove('vol');
    }
}

handlevol.addEventListener('mousedown', function(e) {
    isDragging = true;
    e.preventDefault();
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

document.addEventListener('keydown', function(e) {
    if (isDragging) return;
    
    let currentHeight = parseFloat(document.getElementById('barvol').style.height) || 0;

    switch(e.key) {
        case 'ArrowUp':
            
            currentHeight = Math.min(100, currentHeight + 25);
            break;
        case 'ArrowDown':
            currentHeight = Math.max(0, currentHeight - 25);
            break;
        default:
            return; 
    }

    document.getElementById('barvol').style.height = `${currentHeight}%`;
    handlevol.style.bottom = `${currentHeight}%`;

    volnumb.textContent = `${Math.round(currentHeight)}%`;

    updateVideoVolume();
});

vol.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const posY = e.clientY - vol.getBoundingClientRect().top;
        let volHeight = vol.clientHeight;
        let percentage = (volHeight - posY) / volHeight * 100;

        percentage = Math.max(0, Math.min(100, percentage));

        document.getElementById('barvol').style.height = `${percentage}%`;
        handlevol.style.bottom = `${percentage}%`;

        volnumb.textContent = `${Math.round(percentage)}%`;

        updateVideoVolume();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateVideoVolume();
});


// brilho
const BrightnessControl = {
  init: function() {
      this.brilhop = document.getElementById('brilhop');
      this.handle = document.getElementById('handle');
      this.percentageText = document.getElementById('percentage');
      this.barbr = document.getElementById('barbr');
      this.brilho = document.getElementById('brilho');
      this.icbr = document.querySelector('.icbr');
      this.isDragging = false;

      const initialHeight = 100;
      this.barbr.style.height = `${initialHeight}%`;
      this.handle.style.bottom = `${initialHeight}%`;
      this.percentageText.textContent = `${initialHeight}%`;
      this.brilho.style.opacity = 0;

      this.handle.addEventListener('mousedown', (e) => {
          this.isDragging = true;
          e.preventDefault();
      });

      document.addEventListener('mouseup', () => {
          this.isDragging = false;
      });

      document.addEventListener('keydown', (e) => {
          if (this.isDragging) return; 
          
          const rect = this.brilhop.getBoundingClientRect();
          let brilhopHeight = rect.height;
          let currentHeight = parseFloat(this.handle.style.bottom) || 0;

          switch(e.key) {
              case '1':
                  currentHeight = Math.min(100, currentHeight + 25);
                  break;
              case '0':
                  currentHeight = Math.max(0, currentHeight - 25);
                  break;
              default:
                  return;
          }

          this.updateBrightness(currentHeight);
      });

      this.brilhop.addEventListener('mousemove', (e) => {
          if (this.isDragging) {
              const posY = e.clientY - this.brilhop.getBoundingClientRect().top;
              let brilhopHeight = this.brilhop.clientHeight;
              let percentage = (brilhopHeight - posY) / brilhopHeight * 100;

              percentage = Math.max(0, Math.min(100, percentage));

              this.updateBrightness(percentage);
          }
      });
  },

  updateBrightness: function(percentage) {
      this.handle.style.bottom = `${percentage}%`;

      this.percentageText.textContent = `${Math.round(percentage)}%`;

      this.barbr.style.height = `${percentage}%`;

      const opacity = 1 - (percentage / 100); 
      this.brilho.style.opacity = opacity.toFixed(2); 

      if (percentage === 0) {
          this.icbr.classList.add('zerob');
      } else {
          this.icbr.classList.remove('zerob');
      }
  }
};
document.addEventListener('DOMContentLoaded', function() {
  BrightnessControl.init();
});














// timeline
const progressBar = document.getElementById('progress');
const handletimeline = document.getElementById('handletimeline');
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
let isDragging = false;

let initialWidth = 0;
document.getElementById('bar').style.width = `${initialWidth}%`;
handletimeline.style.left = `${initialWidth}%`;

handletimeline.addEventListener('mousedown', function(e) {
isDragging = true;
e.preventDefault();
});

document.addEventListener('mouseup', function() {
isDragging = false;
});


progressBar.addEventListener('mousemove', function(e) {
if (isDragging) {
updateProgressFromMouse(e);
}
});

function updateProgressFromMouse(e) {
const posX = e.clientX - progressBar.getBoundingClientRect().left;
let progressWidth = progressBar.clientWidth;
let percentage = (posX / progressWidth) * 100;

percentage = Math.max(0, Math.min(100, percentage));

updateProgress(percentage);
}

function updateProgress(percentage) {
document.getElementById('bar').style.width = `${percentage}%`;
handletimeline.style.left = `${percentage}%`;

const newTime = (percentage / 100) * video.duration;
video.currentTime = newTime;
}

video.addEventListener('timeupdate', function() {
const currentTime = video.currentTime;
const duration = video.duration;
const progressPercentage = (currentTime / duration) * 100;

document.getElementById('bar').style.width = `${progressPercentage}%`;
handletimeline.style.left = `${progressPercentage}%`;

currentTimeElem.textContent = formatarTempo(currentTime);
if (!isNaN(duration) && isFinite(duration) && duration > 0) {
totalTimeElem.textContent = formatDuration(duration);
}
});

video.addEventListener('loadedmetadata', function() {
const duration = video.duration;
const progressPercentage = (video.currentTime / duration) * 100;

document.getElementById('bar').style.width = `${progressPercentage}%`;
handletimeline.style.left = `${progressPercentage}%`;

if (!isNaN(duration) && isFinite(duration) && duration > 0) {
totalTimeElem.textContent = formatDuration(duration);
}
});

function formatarTempo(tempo) {
const minutos = Math.floor(tempo / 60);
const segundos = Math.floor(tempo % 60);
const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
return `${minutosFormatados}:${segundosFormatados}`;
}

function formatDuration(time) {
const seconds = Math.floor(time % 60);
const minutes = Math.floor(time / 60) % 60;
const hours = Math.floor(time / 3600);
if (hours === 0) {
return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
} else {
return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
}









// travar tela
var blockElement = document.getElementById('block');

blockElement.addEventListener('click', function() {
    if (!blockElement.classList.contains('unlock')) {
        blockElement.classList.add('unlock');
        document.querySelectorAll('.topp p, .logotl, #pular, .medp, .endp, .progressline').forEach(function(element) {
            element.classList.add('unlock');
        });
    } else {
        blockElement.classList.remove('unlock');
        document.querySelectorAll('.topp p, .logotl, #pular, .medp, .endp, .progressline').forEach(function(element) {
            element.classList.remove('unlock');
        });
    }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'b' || e.key === 'B') {
      var blockElement = document.getElementById('block');
      blockElement.click();
  }
});



// Qualidades
var moreButton = document.getElementById('more');
var viewModeElement = document.querySelector('.viewmode');

moreButton.addEventListener('click', function() {
  viewModeElement.classList.add('m');
});

viewModeElement.addEventListener('click', function(event) {
  if (event.target === viewModeElement) {
    viewModeElement.classList.remove('m');
  }
});
document.addEventListener('keydown', function(event) {
  if (event.key === 'o' || event.key === 'O') {
    viewModeElement.classList.toggle('m');
  }
});


// volume
volumeButton.addEventListener('click', function() {
    if (video.muted) {
      video.muted = false;  
      volumeButton.classList.remove('vol');
    } else {
      video.muted = true; 
      volumeButton.classList.add('vol');
    }
  });
document.addEventListener('keydown', function(event) {
    if (event.key === 'v' || event.key === 'v') {
        volumeButton.classList.toggle('vol');
        volumeButton.click();
    }
  });


// reiniciar video
reiniciarButton.addEventListener('click', function() {
video.currentTime = 0;
video.pause();
video.play();
});

document.addEventListener('keydown', function(event) {
if (event.key === 'r' || event.key === 'r') {
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






// Pular tempo button superior
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

  seconds = Math.max(0, seconds - 85); 
  updatePOPButtonTimer();
}

  
// Button "Pular OP"
var pOPButton = document.getElementById('pOP');
var timerInterval = null;
var seconds = 85; 

var videoStarted = false;
function updateTimer() {
    timerInterval = setInterval(function() {
        seconds--;
    
        if (seconds >= 0) {
            pOPButton.textContent = 'Pular OP (' + seconds + 's)';
        } else {
            clearInterval(timerInterval);
            hidePOPButton(); 
        }
    }, 1000); 
}
function showPOPButton() {
    pOPButton.style.display = 'flex';
    pOPButton.classList.add('show');
}

function hidePOPButton() {
    pOPButton.classList.remove('show');
}

function startTimerWithDelay() {
    setTimeout(function() {
        showPOPButton();
        updateTimer(); 
    }, parseInt(pOPButton.getAttribute('data-time')) * 1000 || 0);
}

video.addEventListener('play', function() {
    if (!videoStarted) {
        startTimerWithDelay(); 
        videoStarted = true; 
    } else {
        updateTimer();
    }
});

video.addEventListener('pause', function() {
    clearInterval(timerInterval);
});

video.addEventListener('ended', function() {
    clearInterval(timerInterval);
    hidePOPButton(); 
});

pOPButton.addEventListener('click', function() {
    var secondsToSkip = seconds;
    video.currentTime += secondsToSkip;
    clearInterval(timerInterval);
    hidePOPButton();
});



// Buttons para avançar/retornar tempo
lefttimeButton.addEventListener('click', function() {
    video.currentTime -= 10;
    seconds = Math.max(0, seconds - 10); // Atualiza o cronômetro
    updatePOPButtonTimer();
    videoContainer.classList.add('leftt');
    setTimeout(function() {
        videoContainer.classList.remove('leftt');
    }, 300);
});

righttimeButton.addEventListener('click', function() {
    video.currentTime += 10;
    seconds = Math.max(0, seconds - 10); 
    updatePOPButtonTimer();
    videoContainer.classList.add('rightt');
    setTimeout(function() {
        videoContainer.classList.remove('rightt');
    }, 300);
});

function updatePOPButtonTimer() {
    pOPButton.textContent = 'Pular OP (' + seconds + 's)';
}

videoContainer.addEventListener('dblclick', function(event) {
    var clickedElement = event.target;

    if (clickedElement.tagName !== 'BUTTON' && !clickedElement.closest('button')) {
        var containerWidth = videoContainer.offsetWidth;
        var clickX = event.clientX - videoContainer.getBoundingClientRect().left;

        if (clickX < containerWidth / 2) {
            videoContainer.classList.add('leftt');
            videoContainer.classList.remove('rightt');
            lefttimeButton.click();
        } else {
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
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        if (event.keyCode === 37) { 
            video.currentTime -= 10;
            seconds = Math.max(0, seconds - 10);
            updatePOPButtonTimer();
            videoContainer.classList.add('leftt');
            setTimeout(function() {
                videoContainer.classList.remove('leftt');
            }, 300);
        } else if (event.keyCode === 39) { 
            video.currentTime += 10;
            seconds = Math.max(0, seconds - 10); 
            updatePOPButtonTimer();
            videoContainer.classList.add('rightt');
            setTimeout(function() {
                videoContainer.classList.remove('rightt');
            }, 300);
        }
    }
});



// Play e Pause
playpauseButton.addEventListener('click', function() {
    if (video.paused || video.ended) {
        video.play();
        playpauseButton.classList.add('pause');
    } else {
        video.pause();
        playpauseButton.classList.remove('pause');
    }
});

video.addEventListener('play', function() {
    playpauseButton.classList.add('pause');
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
      // Remove classes p1, p2, p3 da .download antes de adicionar a nova classe
      downloadLink.classList.remove("p1", "p2", "p3");
      
      // Adiciona a classe específica de qualidade ao link de download
      var qualityClass = button.classList[1]; // Assume que a segunda classe é a classe de qualidade (1080p, 720p, 480p)

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
        video.play();
      }
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
