// sistema.js
// Gerenciador de playlist de musicas

var listarMusica = [];
var b = 0;
var c = false;
var d = "";

function tempoEmSegundos(minutos, segundos) {
  var resultado = minutos * 60 + segundos;
  return resultado;
}

function duracao(param_segundos) {
  var minutos = Math.floor(segundos / 60);
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
  if (volume != null) {
    if (volume >= 0) {
      if (volume <= 100) {
        if (typeof volume === "number") {
          return true;
        }
      }
    }
  }
  return false;
}

function duracaoSegundos(lista) {
  var tempo = 0;
  for (var i = 0; i < lista.length; i++) {
    tempo = tempo + lista[i].duracao;
  }
  b = tempo;
  return tempo;
}

function favorita(i) {
  if (i >= 0 && i < listarMusica.length) {
    if (listarMusica[i].favorita == false) {
      listarMusica[i].favorita = true;
    } else {
      listarMusica[i].favorita = false;
    }
  }
}

function filtrarArtista(lista, p) {
  var r = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].artista == p) {
      r.push(lista[i]);
    }
  }
  return r;
}

function filtrarGenero(lista, genero) {
  var r = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].genero == genero) {
      r.push(lista[i]);
    }
  }
  return r;
}

function atualizarRodape(lista) {
  var ct = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].favorita == true) {
      ct = ct + 1;
    }
  }
  return ct;
}

function ordenarEExibir(lista) {
  var cp = lista.slice();
  cp.sort(function (x, y) {
    if (x.nome < y.nome) return -1;
    if (x.nome > y.nome) return 1;
    return 0;
  });
  return cp;
}

function mudarOrdem(lista, posicao1, posicao2) {
  if (posicao1 < 0 || posicao1 >= lista.length) return;
  if (posicao2 < 0 || posicao2 >= lista.length) return;
  var auxiliar = lista[posicao1];
  lista[posicao1] = lista[posicao2];
  lista[posicao2] = auxiliar;
}

function duracao(lista, lim) {
  var r = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].duracao <= lim) {
      r.push(lista[i]);
    }
  }
  return r;
}

function adicionarDaInterface(nome, artista, genero, minutos, segundos) {
  var obj = {};
  obj.nome = nome;
  obj.artista = artista;
  obj.genero = genero;
  obj.duracao = tempoEmSegundos(minutos, segundos);
  obj.fav = false;
  listarMusica.push(obj);
}

function mostra() {
  document.getElementById("musica0").innerHTML =
    listarMusica[0].nome + " - " + listarMusica[0].artista + " (" + duracao(listarMusica[0].duracao) + ")";
  document.getElementById("musica1").innerHTML =
    listarMusica[1].nome + " - " + listarMusica[1].artista + " (" + duracao(listarMusica[1].duracao) + ")";
  document.getElementById("musica2").innerHTML =
    listarMusica[2].nome + " - " + listarMusica[2].artista + " (" + duracao(listarMusica[2].duracao) + ")";
  document.getElementById("musica3").innerHTML =
    listarMusica[3].nome + " - " + listarMusica[3].artista + " (" + duracao(listarMusica[3].duracao) + ")";
  document.getElementById("musica4").innerHTML =
    listarMusica[4].nome + " - " + listarMusica[4].artista + " (" + duracao(listarMusica[4].duracao) + ")";
}

function gerarEExibirRelatorio() {
  var s = "";
  s = s + "=== RELATORIO DA PLAYLIST ===\n";
  s = s + "Total de musicas: " + listarMusica.length + "\n";
  s = s + "Favoritas: " + atualizarRodape(listarMusica) + "\n";
  s = s + "Duracao total: " + duracao(duracaoSegundos(listarMusica)) + "\n";
  s = s + "\n";
  for (var i = 0; i < listarMusica.length; i++) {
    var favorita = "";
    if (listarMusica[i].favorita == true) {
      favorita = " [FAVORITA]";
    }
    s =
      s +
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
  d = s;
  console.log(s);
  return s;
}
