const jugador = "O";
const computador = "X";

let tablero_completo = false;
let tablero_juego = ["", "", "", "", "", "", "", "", ""];

const contenedor_tablero = document.querySelector(".area-juego");

const Ganador = document.getElementById("ganador");

comprobar_tablero_completo = () => {
  let flag = true;
  tablero_juego.forEach(element => {
    if (element != jugador && element != computador) {
      flag = false;
    }
  });
  tablero_completo = flag;
};


const comprobar_linea = (a, b, c) => {
  return (
    tablero_juego[a] == tablero_juego[b] &&
    tablero_juego[b] == tablero_juego[c] &&
    (tablero_juego[a] == jugador || tablero_juego[a] == computador)
  );
};

const comprobar_juego = () => {
  for (i = 0; i < 9; i += 3) {
    if (comprobar_linea(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("gana");
      document.querySelector(`#block_${i + 1}`).classList.add("gana");
      document.querySelector(`#block_${i + 2}`).classList.add("gana");
      return tablero_juego[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (comprobar_linea(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("gana");
      document.querySelector(`#block_${i + 3}`).classList.add("gana");
      document.querySelector(`#block_${i + 6}`).classList.add("gana");
      return tablero_juego[i];
    }
  }
  if (comprobar_linea(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("gana");
    document.querySelector("#block_4").classList.add("gana");
    document.querySelector("#block_8").classList.add("gana");
    return tablero_juego[0];
  }
  if (comprobar_linea(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("gana");
    document.querySelector("#block_4").classList.add("gana");
    document.querySelector("#block_6").classList.add("gana");
    return tablero_juego[2];
  }
  return "";
};

const comprobar_ganador = () => {
  let res = comprobar_juego()
  if (res == jugador) {
    ganador.innerText = "Gana el jugador!!";
    ganador.classList.add("jugadorgana");
    tablero_completo = true
  } else if (res == computador) {
    ganador.innerText = "Gana la computadora";
    ganador.classList.add("computadorgana");
    tablero_completo = true
  } else if (tablero_completo) {
    ganador.innerText = "Empate!";
    ganador.classList.add("empate");
  }
};


const dibujar_tablero = () => {
  contenedor_tablero.innerHTML = ""
  tablero_juego.forEach((e, i) => {
    contenedor_tablero.innerHTML += `<div id="block_${i}" class="block" onclick="movimientojugador(${i})">${tablero_juego[i]}</div>`
    if (e == jugador || e == computador) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const bucle_juego = () => {
  dibujar_tablero();
  comprobar_tablero_completo();
  comprobar_ganador();
}

const movimientojugador = e => {
  if (!tablero_completo && tablero_juego[e] == "") {
    tablero_juego[e] = jugador;
    bucle_juego();
    movimientocomputador();
  }
};

const movimientocomputador = () => {
  if (!tablero_completo) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (tablero_juego[selected] != "");
    tablero_juego[selected] = computador;
    bucle_juego();
  }
};

const reiniciar_tablero = () => {
  tablero_juego = ["", "", "", "", "", "", "", "", ""];
  tablero_completo = false;
  ganador.classList.remove("jugadorgana");
  ganador.classList.remove("computadorgana");
  ganador.classList.remove("empate");
  ganador.innerText = "";
  dibujar_tablero();
};

//Render inicial
dibujar_tablero();