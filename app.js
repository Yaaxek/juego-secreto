let numeroSecreto;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10; 
let intentosMaximos = 4;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); 
    elementoHTML.innerHTML = texto; 
    return;
}

function verificarIntento(){ 
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    // Validar si el valor es un número válido y está en el rango correcto
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('#parrafo1',`Por favor ingresa un número entre el 1 y ${numeroMaximo}.`);
        limpiarCaja();
        return;
    }

    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('#parrafo1', `Acertaste el numero en ${intentos} ${(intentos ===1) ? 'vez.' : 'veces.'}`);
        asignarTextoElemento('#parrafo2', '¡Felicitaciones!');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('nuevoJuego').setAttribute('disabled', true);
        document.getElementById('valorUsuario').setAttribute('disabled', true);
    } else {
        //El usuario no ha acertado el numero
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('#parrafo1', 'El numero secreto es menor.');
        }else{
            asignarTextoElemento('#parrafo1', 'El numero secreto es mayor.');
        }
        asignarTextoElemento('#parrafo2', `Intentos restantes: ${intentosMaximos - intentos}.`);
        intentos++;
        if (intentos > intentosMaximos){
            asignarTextoElemento('#parrafo1', `Has agotado tus intentos, el numero secreto era ${numeroSecreto}.`);
            asignarTextoElemento('#parrafo2', 'Para continuar, haz click en "Nuevo juego".');
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('nuevoJuego').setAttribute('disabled', true);
            document.getElementById('valorUsuario').setAttribute('disabled', true);
        }
        limpiarCaja();
    }
    
    return;
}

function limpiarCaja(){
    let valorCaja = document.querySelector('#valorUsuario').value = '';
}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()* numeroMaximo) + 1;

    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('#parrafo1', 'No hay mas numeros disponibles.');
        asignarTextoElemento('#parrafo2', 'El juego ha terminado.');
        document.getElementById('nuevoJuego').setAttribute('disabled', true);
        document.getElementById('reiniciar').setAttribute('disabled', true);
        document.getElementById('valorUsuario').setAttribute('disabled', true);
        return;
    }else{
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('#parrafo1', `Indica un numero del 1 al ${numeroMaximo}.`);
    asignarTextoElemento('#parrafo2', `Tienes ${intentosMaximos} intentos.`);
    intentos = 1;
    numeroSecreto = generarNumeroSecreto();
    
}
function reiniciarJuego(){
    // Limpiar la caja de texto
    limpiarCaja();
    document.getElementById('valorUsuario').removeAttribute('disabled');
    document.getElementById('nuevoJuego').removeAttribute('disabled');
    // Indicar mensaje de intervalo de numeros
    condicionesIniciales();
    // Desactivar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}

condicionesIniciales();
