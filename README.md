<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo da Forca</title>
  <style>
    #word-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      font-size: 24px;
    }

    #hint {
      margin-top: 20px;
    }

    #score {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    #guesses-container {
      margin-top: 10px;
    }

    #keyboard {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 5px;
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
  </style>
</head>
<body>
  <h1>Jogo da Forca</h1>

  <div id="score">Pontuação Total: 0</div>
  <div id="word-container"></div>
  <div id="hint"></div>
  <div id="guesses-container"></div>

  <div id="keyboard"></div>

  <button id="next-round-btn" onclick="nextRound()">Próxima Rodada</button>

  <script>
    const answers = [
      { word: "john", hint: "Um nome comum para um homem." },
      { word: "emily", hint: "Um nome comum para uma mulher." },
      { word: "paris", hint: "Uma cidade conhecida como a Cidade Luz." },
      { word: "tokyo", hint: "A capital do Japão." }
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
      }

      displayWord();
      displayHint();
      displayScore();
      displayIncorrectGuesses();

      if (!guessedWord.includes("_")) {
        document.getElementById("next-round-btn").style.display = "block";
        // Salva a pontuação no localStorage
        localStorage.setItem("totalScore", totalScore);
      } else if (incorrectGuesses.length === 6) {
        document.getElementById("next-round-btn").style.display = "block";
      }
    }

    function nextRound() {
      document.getElementById("next-round-btn").style.display = "none";
      // Reinicia a pontuação se o botão "Próxima Rodada" for clicado
      totalScore = 0;
      // Carrega a pontuação acumulada do localStorage, se existir
      const storedScore = localStorage.getItem("totalScore");
      if (storedScore) {
        totalScore = parseInt(storedScore, 10);
      }
      startGame();
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

    startGame();
  </script>
</body>
</html>
