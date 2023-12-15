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

  <script>
    let tempoRestante = localStorage.getItem('tempoRestante') || 900; // 15 minutos em segundos
    let diamantesColetados = 0;

    function atualizarCronometro() {
      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;
      document.getElementById('countdown').innerText = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }

    function coletarDiamante() {
      if (tempoRestante === 0) {
        diamantesColetados += 2;
        document.getElementById('mensagem').innerText = 'Diamantes coletados! Reiniciando o cronômetro.';
        reiniciarCronometro();
      } else {
        document.getElementById('mensagem').innerText = 'Espere o cronômetro zerar para coletar novamente.';
      }
    }

    function reiniciarCronometro() {
      tempoRestante = 900; // Reiniciar para 15 minutos
      localStorage.setItem('tempoRestante', tempoRestante);
      atualizarCronometro();
    }

    function iniciarContagemRegressiva() {
      setInterval(function() {
        if (tempoRestante > 0) {
          tempoRestante--;
          localStorage.setItem('tempoRestante', tempoRestante);
          atualizarCronometro();
        }
      }, 1000);
    }

    // Iniciar o cronômetro quando a página carregar
    window.onload = function() {
      iniciarContagemRegressiva();
    };
  </script>

</body>
</html>
