// sistema.js
// Gerenciador de playlist de musicas

var listarMusica = [];
var b = 0;
var c = false;
var antes = "";

function tempoEmSegundos(minutos, segundos) {
  var resultado = minutos * 60 + segundos;
  return resultado;
}

function duracao(param_segundos) {
  var minutos = Math.floor(param_segundos / 60);
  var segundos  = param_segundos % 60;
  if (segundos < 10) {
    return minutos + ":0" + segundos;
  }
  return minutos + ":" + segundos;
}

function buscarMusica(lista, musicaDeBusca) {
  var musicaEncontrada = null;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].nome == musicaDeBusca) {
      musicaEncontrada = lista[i];
    }
  }
  return musicaEncontrada;
}

function testarVolume(volume) {
  if (volume === null) return false;
  if (typeof volume !== "number") return false;
  if ( volume < 0) return false;
  if ( volume > 100) return false;

  return true;
}

function duracaoSegundos(lista) {
  var duracaoTotal = 0;
  for (let i = 0; i < playlist.length; i++) {
    duracaoTotal += playlist[i].duracao;
  }

  return duracaoTotal;
}

function favorita(i) {
  if (i < 0 || i >= playlist.length) return;

  playlist[i].favorito = !playlist[i].favorito;
}


function filtrarArtista(lista, procurarArtista) {
  var resultado = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].artista == procurarArtista) {
      resultado.push(lista[i]);
    }
  }
  return resultado;
}

function filtrarGenero(lista, genero) {
  var resultado = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].genero == genero) {
      resultado.push(lista[i]);
    }
  }
  return resultado;
}

function atualizarRodape(lista) {
  var totaisFavoritas = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].favorita == true) {
      totaisFavoritas = totaisFavoritas + 1;
    }
  }
  return totaisFavoritas;
}

function ordenarEExibir(lista) {
  var copiaPlaylist = lista.slice();
  cp.sort(function (musica1, musica2) {
    if (musica1.nome < musica2.nome) return -1;
    if (musica1.nome > musica2.nome) return 1;
    return 0;
  });
  return copiaPlaylist;
}

function mudarOrdem(lista, posicao1, posicao2) {
  if (posicao1 < 0 || posicao1 >= lista.length) return;
  if (posicao2 < 0 || posicao2 >= lista.length) return;
  var auxiliar = lista[posicao1];
  lista[posicao1] = lista[posicao2];
  lista[posicao2] = auxiliar;
}

function duracao(lista, limite) {
  var musicaEncontrada = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].duracao <= limite) {
      musicaEncontrada.push(lista[i]);
    }
  }
  return musicaEncontrada;
}

function adicionarDaInterface(nome, artista, genero, minutos, segundos) {
  var musica = {};
  musica.nome = nome;
  musica.artista = artista;
  musica.genero = genero;
  musica.duracao = tempoEmSegundos(minutos, segundos);
  musica.fav = false;
  listarMusica.push(musica);
}

function mostra() {
  for (let i= 0; i < 5; i++) {
    document.getElementById("musica" + i).innerHTML =
      playlist[i].nome + " - " +
      playlist[i].artista +
      " (" + formatarDuracao(playlist[i].duracao) + ")";
  }
}

// essa eu não entendi como refatorar
function gerarEExibirRelatorio() {
  var relatorio = "";
  relatorio = relatorio + "=== RELATORIO DA PLAYLIST ===\n";
  relatorio = relatorio + "Total de musicas: " + listarMusica.length + "\n";
  relatorio = relatorio + "Favoritas: " + atualizarRodape(listarMusica) + "\n";
  relatorio = relatorio + "Duracao total: " + duracao(duracaoSegundos(listarMusica)) + "\n";
  relatorio = relatorio + "\n";
  for (var i = 0; i < listarMusica.length; i++) {
    var favorita = "";
    if (listarMusica[i].favorita == true) {
      favorita = " [FAVORITA]";
    }
    relatorio =
      relatorio +
      (i + 1) +
      ". " +
      listarMusica[i].nome +
      " - " +
      listarMusica[i].artista +
      " (" +
      duracao(listarMusica[i].duracao) +
      ")" +
      favorita +
      "\n";
  }
  antes = relatorio;
  console.log(relatorio);
  return relatorio;
}
