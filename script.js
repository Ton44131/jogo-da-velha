// inicializa as casas com nove para sabermos que não foi clicado
var casas = [9, 9, 9, 9, 9, 9, 9, 9, 9];
// indica a vez do jogador - (1) xis (−1) bola
var vez = 1;
// conta quantos cliques foram dados durante o jogo
var contaclique = 0;

// Placar
var iPontosX = 0;
var iPontosO = 0;
var iPontosV = 0;
var sResposta = "";

var lGanhou = false;
var lAcabou = true;

// Função que verifica as jogadas
function verifica(casa) {
  // verifica se a casa não foi clicada
  if (casas[casa] === 9) {
    // Modifica o 9 para o valor do jogador da vez
    casas[casa] = vez;

    if (vez === 1) {
        document.getElementById("img"+casa).src="img/images-removebg-preview.png";
    }else{
        //se o jogador for -1, coloca o desenho da bola
        document.getElementById("img"+casa).src="img/Pokéball.png";
    }

    // inverte o jogador da vez
    vez *= -1;
    contaclique++;
    confere();
  }
}

// Função que testa se houve vencedor
function confere() {
  var i;
  var Soma = [];
  lGanhou = false;
  lAcabou = true;

  for (i = 0; i < casas.length; i++) {
    if (casas[i] === 9) {
      lAcabou = false;
    }
  }

  if (contaclique >= 9) {
    lAcabou = true;
  }

  Soma[0] = casas[0] + casas[1] + casas[2];
  Soma[1] = casas[3] + casas[4] + casas[5];
  Soma[2] = casas[6] + casas[7] + casas[8];
  Soma[3] = casas[0] + casas[3] + casas[6];
  Soma[4] = casas[1] + casas[4] + casas[7];
  Soma[5] = casas[2] + casas[5] + casas[8];
  Soma[6] = casas[0] + casas[4] + casas[8];
  Soma[7] = casas[2] + casas[4] + casas[6];

  for (i = 0; i < Soma.length; i++) {
    if (Soma[i] === -3) {
      lGanhou = true;
      sResposta = "pokebolla ganhou!";
      iPontosO++;
      document.getElementById("bola").innerHTML = "Pontos pokebolla: " + iPontosO;
      break;
    } else if (Soma[i] === 3) {
      lGanhou = true;
      sResposta = "Pikavitória";
      iPontosX++;
      document.getElementById("xis").innerHTML = "Pikapontos: " + iPontosX;
      break;
    }
  }

  if (!lGanhou && lAcabou) {
    sResposta = "Deu VELHA!!!";
    iPontosV++;
    document.getElementById("velha").innerHTML = "VELHA... : " + iPontosV;
  }

  if (lGanhou || lAcabou) {
    for (i = 0; i < casas.length; i++) {
      document.getElementById("casa" + i).disabled = true;
      casas[i] = 0;
    }

    document.getElementById("resposta").innerHTML = sResposta;
    document.getElementById("resposta").style.color = "#ff4d00";
    document.getElementById("resposta").style.fontSize = "xx-large";
    // window.confirm(sResposta); // opcional
  }
}

// Função que recomeça todo o jogo
function recomeca() {
  for (var i = 0; i < casas.length; i++) {
    document.getElementById("img" + i).ondragstart = function () {
      return false;
    };
    document.getElementById("casa" + i).disabled = false;
    document.getElementById("img" + i).src = "";
    casas[i] = 9;
  }

  document.getElementById("resposta").innerHTML = "RESULTADO:";
  document.getElementById("resposta").style.color = "#5fff00";
  document.getElementById("resposta").style.fontSize = "large";

  lGanhou = false;
  lAcabou = true;
  contaclique = 0;
  vez = 1;
}
