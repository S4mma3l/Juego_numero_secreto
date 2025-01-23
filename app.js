let numeroSecreto = 0;
let listaNumerosSorteados = [];
let intentos = 0;
let numeroMaximo = 10;
let selectedNumber = 1; // Número seleccionado inicialmente

// Inicializar Swiper
const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  freeMode: true,
  effect: 'coverflow', 
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
});

// Obtener el número seleccionado
swiper.on('slideChange', () => {
  selectedNumber = parseInt(swiper.slides[swiper.activeIndex].textContent);
});


function asignarTextoElemento(elemento, texto) {
  document.querySelector(elemento).innerHTML = texto;
}

function verificarIntento() {
  let numeroDelUsuario = selectedNumber; // Usar el número del selector
  if (numeroDelUsuario === numeroSecreto) {
    asignarTextoElemento('p', `Acertaste el número secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.querySelector('#reiniciar').classList.remove('disabled'); 
  } else {
    if (numeroDelUsuario > numeroSecreto) {
      asignarTextoElemento('p', 'El número secreto es menor');
    } else {
      asignarTextoElemento('p', 'El número secreto es mayor');
    }
    intentos++;
  }
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento('h1', 'Bienvenido al juego');
  asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  document.querySelector('#reiniciar').setAttribute('disabled', true);
  document.querySelector('#reiniciar').classList.add('disabled'); 
}

function reiniciarJuego() {
  condicionesIniciales(); 
}

condicionesIniciales();