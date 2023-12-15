<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Forca</title>
    <style>
        input {
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>Jogo de Forca</h1>
    <p>Palavra: <span id="palavra"></span></p>
    <p>Tentativas restantes: <span id="tentativas"></span></p>
    <p>Letras erradas: <span id="letrasErradas"></span></p>
    <input type="text" id="letraInput" maxlength="1">
    <button onclick="adivinhar()">Adivinhar</button>
    <hr>
    <h2>Pontuações</h2>
    <ul id="pontuacoes"></ul>

    <script>
        // Dicionário para armazenar nomes e pontuações
        let pontuacoes = {};

        function carregarPontuacoes() {
            const pontuacoesSalvas = localStorage.getItem("pontuacoes");
            pontuacoes = pontuacoesSalvas ? JSON.parse(pontuacoesSalvas) : {};
        }

        function salvarPontuacoes() {
            localStorage.setItem("pontuacoes", JSON.stringify(pontuacoes));
        }

        function jogarForca() {
            const palavras = ["javascript", "html", "css", "developer", "programming"];
            const palavra = palavras[Math.floor(Math.random() * palavras.length)];
            let tentativas = 6;
            let palavraOculta = Array(palavra.length).fill('_');
            let letrasErradas = [];

            function atualizarInterface() {
                document.getElementById("palavra").textContent = palavraOculta.join(' ');
                document.getElementById("tentativas").textContent = tentativas;
                document.getElementById("letrasErradas").textContent = letrasErradas.join(' ');
            }

            function adivinhar() {
                const letra = document.getElementById("letraInput").value.toLowerCase();

                if (!letra || !/^[a-z]$/.test(letra)) {
                    alert("Por favor, digite uma letra válida.");
                    return;
                }

                if (palavra.includes(letra)) {
                    for (let i = 0; i < palavra.length; i++) {
                        if (palavra[i] === letra) {
                            palavraOculta[i] = letra;
                        }
                    }

                    if (!palavraOculta.includes('_')) {
                        alert("Parabéns! Você acertou a palavra: " + palavra);
                        atualizarPontuacao();
                        return;
                    }
                } else {
                    letrasErradas.push(letra);
                    tentativas--;

                    if (tentativas === 0) {
                        alert("Você perdeu! A palavra era: " + palavra);
                    }
                }

                atualizarInterface();
            }

            carregarPontuacoes();
            atualizarInterface();

            return {
                adivinhar: adivinhar
            };
        }

        function atualizarPontuacao() {
            const nome = prompt("Digite seu Nick:");
            const pontuacaoAtual = pontuacoes[nome] || 0;
            pontuacoes[nome] = pontuacaoAtual + 1;
            alert("Pontuação de " + nome + ": " + pontuacoes[nome]);
            salvarPontuacoes();
            exibirPontuacoes();
        }

        function exibirPontuacoes() {
            const pontuacoesList = document.getElementById("pontuacoes");
            pontuacoesList.innerHTML = "";

            for (const nome in pontuacoes) {
                const pontuacaoItem = document.createElement("li");
                pontuacaoItem.textContent = `${nome}: ${pontuacoes[nome]}`;
                pontuacoesList.appendChild(pontuacaoItem);
            }
        }

        const jogo = jogarForca();
    </script>
</body>
</html>
