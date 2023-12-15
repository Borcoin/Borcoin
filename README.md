<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo da Forca</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        #word-display {
            font-size: 24px;
            margin-bottom: 20px;
        }

        #guess-input {
            font-size: 18px;
            width: 30px;
        }

        #feedback {
            margin-top: 10px;
            font-size: 18px;
            color: red;
        }

        .keyboard-btn {
            font-size: 16px;
            margin: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Jogo da Forca</h1>

    <div id="word-display"></div>
    <input type="text" id="guess-input" maxlength="1">
    <button onclick="guess()">Adivinhar</button>
    <div id="feedback"></div>

    <div id="keyboard">
        <!-- Teclado será adicionado aqui via JavaScript -->
    </div>

    <script>
        const words = ["javascript", "html", "css", "developer", "programming"];
        let selectedWord = words[Math.floor(Math.random() * words.length)];
        let guessedLetters = [];
        let attemptsLeft = 6;

        function displayWord() {
            let display = "";
            for (let letter of selectedWord) {
                if (guessedLetters.includes(letter)) {
                    display += letter + " ";
                } else {
                    display += "_ ";
                }
            }
            document.getElementById("word-display").textContent = display.trim();
        }

        function guess() {
            const inputElement = document.getElementById("guess-input");
            const feedbackElement = document.getElementById("feedback");

            const guessedLetter = inputElement.value.toLowerCase();

            if (!guessedLetter.match(/[a-z]/i)) {
                feedbackElement.textContent = "Por favor, insira uma letra válida.";
                return;
            }

            if (guessedLetters.includes(guessedLetter)) {
                feedbackElement.textContent = "Você já tentou essa letra.";
                return;
            }

            guessedLetters.push(guessedLetter);

            if (!selectedWord.includes(guessedLetter)) {
                attemptsLeft--;
                feedbackElement.textContent = `Letra incorreta! Tentativas restantes: ${attemptsLeft}`;
            }

            displayWord();

            if (attemptsLeft === 0) {
                feedbackElement.textContent = `Você perdeu. A palavra era: ${selectedWord}`;
                inputElement.disabled = true;
            } else if (!displayWord().includes("_")) {
                feedbackElement.textContent = "Parabéns! Você venceu!";
                inputElement.disabled = true;
            } else {
                feedbackElement.textContent = "";
            }

            inputElement.value = "";
            inputElement.focus();
        }

        function createKeyboard() {
            const keyboardContainer = document.getElementById("keyboard");
            const alphabet = "abcdefghijklmnopqrstuvwxyz";

            for (let letter of alphabet) {
                const button = document.createElement("button");
                button.textContent = letter;
                button.classList.add("keyboard-btn");
                button.onclick = function () {
                    document.getElementById("guess-input").value = letter;
                    guess();
                };
                keyboardContainer.appendChild(button);
            }
        }

        createKeyboard();
        displayWord();
    </script>
</body>
</html>
