OBRIGATÓRIO ENTRAR NO GRUPO DO TELEGRAM
https://t.me/borcoinofc
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo da Forca</title>
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    #score {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    #word-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      font-size: 24px;
    }

    #hint {
      margin-top: 20px;
    }

    #guesses-container {
      margin-top: 10px;
    }

    #keyboard {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-top: 20px;
    }

    button {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }

    #next-round-btn {
      display: none;
      margin-top: 20px;
    }

    #reload-count {
      margin-top: 20px;
    }

    #user-id {
      margin-top: 20px;
    }
  </style>
  <script type="text/javascript">
	atOptions = {
		'key' : 'f174b822b902ac519112de39d7f637ca',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
	document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f174b822b902ac519112de39d7f637ca/invoke.js"></scr' + 'ipt>');
</script>
</head>
<body>
  <h1>Jogo da Forca</h1>

  <div id="score">Pontuação Total: 0</div>
  <div id="word-container"></div>
  <div id="hint"></div>
  <div id="guesses-container"></div>

  <div id="keyboard"></div>

  <button id="next-round-btn" onclick="location.reload()">Próxima Rodada</button>

  <div id="reload-count"></div>
  <div id="user-id"></div>

  <script>
    const answers = [
      { word: "john", hint: "Um nome comum para um homem." },
      { word: "emily", hint: "Um nome comum para uma mulher." },
      { word: "paris", hint: "Uma cidade conhecida como a Cidade Luz." },
      { word: "tokyo", hint: "A capital do Japão." },
      { word: "leao", hint: "animal." },
      { word: "jacare", hint: "animal." },
      { word: "lobo", hint: "animal." },
      { word: "jonas", hint: "nome de homem." },
      { word: "ana", hint: "nome de mulher." },
      { word: "elefante", hint: "animal." },
      { word: "fortaleza", hint: "cidade." },
      { word: "cobra", hint: "animal." },
      { word: "flamengo", hint: "time." },
      { word: "gremio", hint: "time." },
      { word: "cruzeiro", hint: "time." },
      { word: "vasco", hint: "time." },
      { word: "alemanha", hint: "países." },
      { word: "Brasil", hint: "países." },
      { word: "egito", hint: "paises." },
      { word: "argentina", hint: "paises." },
    ];

    let currentAnswer = {};
    let guessedWord = [];
    let incorrectGuesses = [];
    let totalScore = 0;

    function startGame() {
      currentAnswer = answers[Math.floor(Math.random() * answers.length)];
      guessedWord = Array(currentAnswer.word.length).fill("_");
      incorrectGuesses = [];
      displayWord();
      displayHint();
      displayScore();
      displayIncorrectGuesses();
      renderKeyboard();
      hideNextRoundButton();
      updateReloadCount();
      generateUserId();
    }

    function displayWord() {
      document.getElementById("word-container").innerHTML = guessedWord.join(" ");
    }

    function displayHint() {
      document.getElementById("hint").innerHTML = `Dica: ${currentAnswer.hint}`;
    }

    function displayScore() {
      document.getElementById("score").innerHTML = `Pontuação Total: ${totalScore}`;
    }

    function displayIncorrectGuesses() {
      document.getElementById("guesses-container").innerHTML = `Tentativas Incorretas: ${incorrectGuesses.join(", ")}`;
    }

    function checkGuess(letter) {
      if (currentAnswer.word.includes(letter)) {
        for (let i = 0; i < currentAnswer.word.length; i++) {
          if (currentAnswer.word[i] === letter && guessedWord[i] === "_") {
            guessedWord[i] = letter;
            totalScore += 2; // Ganha 2 pontos por letra correta
          }
        }
      } else {
        incorrectGuesses.push(letter);
        totalScore -= 1; // Perde 1 ponto por letra incorreta

        // Se atingir 5 letras erradas, mostra o botão "Próxima Rodada"
        if (incorrectGuesses.length === 5) {
          showNextRoundButton();
        }
      }

      displayWord();
      displayHint();
      displayScore();
      displayIncorrectGuesses();

      // Salva a pontuação no localStorage a cada jogada
      localStorage.setItem("totalScore", totalScore);

      if (!guessedWord.includes("_") || incorrectGuesses.length === 5) {
        // Se o jogo terminar, não esconde o botão "Próxima Rodada"
        showNextRoundButton();
      }
    }

    function renderKeyboard() {
      const keyboardContainer = document.getElementById("keyboard");
      keyboardContainer.innerHTML = "";

      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", function () {
          checkGuess(letter);
        });
        keyboardContainer.appendChild(button);
      }
    }

    function showNextRoundButton() {
      document.getElementById("next-round-btn").style.display = "block";
    }

    function hideNextRoundButton() {
      document.getElementById("next-round-btn").style.display = "none";
    }

    function updateReloadCount() {
      const reloadCount = localStorage.getItem("reloadCount") || 0;
      localStorage.setItem("reloadCount", parseInt(reloadCount, 10) + 1);
      document.getElementById("reload-count").innerHTML = `Página atualizada ${reloadCount} vezes.`;
    }

    function generateUserId() {
      const userId = localStorage.getItem("userId") || generateRandomId();
      localStorage.setItem("userId", userId);
      document.getElementById("user-id").innerHTML = `Seu ID: ${userId}`;
    }

    function generateRandomId() {
      return Math.random().toString(36).substring(2, 10);
    }

    // Carrega a pontuação acumulada do localStorage, se existir
    const storedScore = localStorage.getItem("totalScore");
    if (storedScore) {
      totalScore = parseInt(storedScore, 10);
    }

    startGame();
  </script>
  <script type="text/javascript">
	atOptions = {
		'key' : '32a3921042f800091bb1ad96c37de5a0',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
	document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/32a3921042f800091bb1ad96c37de5a0/invoke.js"></scr' + 'ipt>');
</script>
</body>
</html>
