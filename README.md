<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo de Coleta de Diamantes</title>
  <style>
    header {
      text-align: center;
      padding: 20px;
      background-color: #f0f0f0;
    }

    #pontuacao {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 18px;
    }

    #niveis {
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <header>
    <h1>Anúncio Importante!</h1>
    <p>Divirta-se coletando diamantes!</p>
  </header>

  <h2>Jogo de Coleta de Diamantes</h2>
  <p id="timer">Tempo restante: <span id="countdown">15:00</span></p>
  <button onclick="coletarDiamante()">Coletar Diamante</button>
  <p id="mensagem"></p>
  <p id="pontuacao">Pontuação: <span id="pontuacaoValor">0</span></p>

  <div id="niveis">
    <h3>Níveis</h3>
    <ul id="listaNiveis"></ul>
  </div>

  <script>
    let tempoRestante = localStorage.getItem('tempoRestante') || 900; // 15 minutos em segundos
    let diamantesColetados = localStorage.getItem('diamantesColetados') || 0;
    let recargas = localStorage.getItem('recargas') || 0;
    let niveis = 20;
    let recargasPorNivel = 10;

    function atualizarCronometro() {
      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;
      document.getElementById('countdown').innerText = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }

    function atualizarPontuacao() {
      document.getElementById('pontuacaoValor').innerText = diamantesColetados.toFixed(2); // Fixar para dois decimais
    }

    function coletarDiamante() {
      if (tempoRestante === 0) {
        let bonusPercentual = 1 - (recargas * 0.01); // Bônus acumulado para o cronômetro
        tempoRestante = Math.ceil(tempoRestante * bonusPercentual); // Aplicar o bônus
        diamantesColetados += 2 + (diamantesColetados * 0.01); // Bônus acumulado para a pontuação
        localStorage.setItem('diamantesColetados', diamantesColetados);
        document.getElementById('mensagem').innerText = 'Diamantes coletados! Reiniciando o cronômetro.';
        reiniciarCronometro();
        atualizarPontuacao();
        
        // Verificar se é hora de avançar para o próximo nível
        if (recargas >= recargasPorNivel) {
          avancarProximoNivel();
        }
      } else {
        document.getElementById('mensagem').innerText = 'Espere o cronômetro zerar para coletar novamente.';
      }
    }

    function reiniciarCronometro() {
      localStorage.setItem('tempoRestante', tempoRestante);
      atualizarCronometro();
    }

    function avancarProximoNivel() {
      // Reduzir bônus acumulado para o próximo nível
      diamantesColetados *= 0.99;
      localStorage.setItem('diamantesColetados', diamantesColetados);
      
      // Reiniciar contagem de recargas
      recargas = 0;
      localStorage.setItem('recargas', recargas);
      
      alert('Parabéns! Avançou para o próximo nível.');
    }

    function iniciarContagemRegressiva() {
      setInterval(function() {
        if (tempoRestante > 0) {
          tempoRestante--;
          localStorage.setItem('tempoRestante', tempoRestante);
          atualizarCronometro();
        } else {
          recargas++; // Incrementar a contagem de recargas
          localStorage.setItem('recargas', recargas);
        }
      }, 1000);
    }

    function exibirNiveis() {
      const listaNiveis = document.getElementById('listaNiveis');
      listaNiveis.innerHTML = '';
      for (let i = 1; i <= niveis; i++) {
        const bonus = (i * -1).toFixed(2);
        const item = document.createElement('li');
        item.textContent = `Nível ${i}: Bônus de ${bonus}% no cronômetro`;
        listaNiveis.appendChild(item);
      }
    }

    // Iniciar o cronômetro quando a página carregar
    window.onload = function() {
      iniciarContagemRegressiva();
      atualizarPontuacao();
      exibirNiveis();
    };
  </script>

</body>
</html>
