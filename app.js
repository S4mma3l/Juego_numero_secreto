let numeroSecreto = 0;
let listaNumerosSorteados = [];
let intentos = 0;
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  document.querySelector(elemento).innerHTML = texto;
}

function verificarIntento() {
  let numeroDelUsuario = parseInt(document.getElementById('valorUsuario').value);
  if (numeroDelUsuario === numeroSecreto) {
    asignarTextoElemento('p', `Acertaste el número secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.querySelector('#reiniciar').classList.remove('disabled'); // Quitar la clase "disabled"
  } else {
    if (numeroDelUsuario > numeroSecreto) {
      asignarTextoElemento('p', 'El número secreto es menor');
    } else {
      asignarTextoElemento('p', 'El número secreto es mayor');
    }
    // Efecto "shake" en el input
    const input = document.getElementById('valorUsuario');
    input.classList.add('shake');
    setTimeout(() => {
      input.classList.remove('shake');
    }, 500);
    intentos++;
    limpiarCaja();
  }
}

function limpiarCaja() {
  document.querySelector('#valorUsuario').value = '';
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
  asignarTextoElemento('h1', 'Bienvenido al juego del número secreto');
  asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  document.querySelector('#reiniciar').setAttribute('disabled', true);
  document.querySelector('#reiniciar').classList.add('disabled'); // Agregar la clase "disabled"
}

function reiniciarJuego() {
  limpiarCaja();
  condicionesIniciales(); 
}

condicionesIniciales();