<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo da Velha</title>
  <style>
    td {
      width: 50px;
      height: 50px;
      text-align: center;
      border: 1px solid #000;
      cursor: pointer;
    }
  </style>
</head>
<body>

<h1>Jogo da Velha</h1>
<p>Placar: <span id="playerX">0</span> - <span id="playerO">0</span></p>
<p>Escolha a dificuldade:
  <select id="difficulty" onchange="changeDifficulty()">
    <option value="easy">Fácil</option>
    <option value="medium">Médio</option>
    <option value="hard">Difícil</option>
  </select>
</p>

<table>
  <tr>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
  </tr>
  <tr>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
  </tr>
  <tr>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
    <td onclick="play(this)"></td>
  </tr>
</table>

<script>
  let currentPlayer = 'X';
  let playerXScore = 0;
  let playerOScore = 0;
  let difficulty = 'easy'; // Default difficulty

  function play(cell) {
    if (!cell.innerHTML) {
      cell.innerHTML = currentPlayer;
      if (checkWinner()) {
        alert(currentPlayer + " venceu!");
        updateScore();
        resetBoard();
      } else if (isBoardFull()) {
        alert("Empate!");
        resetBoard();
      } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (currentPlayer === 'O') {
          setTimeout(robotPlay, 500); // Adiciona um atraso para a jogada do robô
        }
      }
    }
  }

  function robotPlay() {
    const emptyCells = document.querySelectorAll('td:empty');
    if (emptyCells.length > 0) {
      let robotCell;

      if (difficulty === 'easy') {
        robotCell = getRandomEmptyCell(emptyCells);
      } else if (difficulty === 'medium') {
        robotCell = getMediumDifficultyMove(emptyCells);
      } else if (difficulty === 'hard') {
        // Adicione aqui a lógica para o modo difícil
        // Por exemplo, pode usar um algoritmo minimax
        robotCell = getHardDifficultyMove(emptyCells);
      }

      robotCell.innerHTML = 'O';
      if (checkWinner()) {
        alert("O robô venceu!");
        updateScore();
        resetBoard();
      } else if (isBoardFull()) {
        alert("Empate!");
        resetBoard();
      } else {
        currentPlayer = 'X';
      }
    }
  }

  function getRandomEmptyCell(cells) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    return cells[randomIndex];
  }

  function getMediumDifficultyMove(cells) {
    // Lógica para um movimento médio (pode ser melhorada)
    return getRandomEmptyCell(cells);
  }

  function getHardDifficultyMove(cells) {
    // Adicione aqui a lógica para o modo difícil usando um algoritmo minimax
    // Exemplo básico:
    return minimax(cells, currentPlayer).index;
  }

  function minimax(cells, player) {
    // Implemente o algoritmo minimax aqui para o modo difícil
    // Retorna um objeto com { score, index }
    // score: 10 se o jogador ganhar, -10 se perder, 0 se empate
    // index: índice da célula escolhida
    // Exemplo básico:
    const scores = [];
    const moves = [];

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML === '') {
        cells[i].innerHTML = player;
        const score = minimaxScore(cells, 0, false);
        cells[i].innerHTML = '';

        scores.push(score);
        moves.push(i);
      }
    }

    const bestMoveIndex = (player === 'O') ? moves[scores.indexOf(Math.max(...scores))] : moves[scores.indexOf(Math.min(...scores))];
    return { score: scores[bestMoveIndex], index: bestMoveIndex };
  }

  function minimaxScore(cells, depth, isMaximizing) {
    // Implemente a função de avaliação para o minimax aqui
    // Retorna 10 se o jogador 'O' ganhar, -10 se 'X' ganhar, 0 se empate
    // Considere a profundidade para penalizar movimentos mais longos
    // Exemplo básico:
    if (checkWinner()) {
      return (currentPlayer === 'O') ? 10 - depth : -10 + depth;
    } else if (isBoardFull()) {
      return 0;
    }

    const scores = [];

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML === '') {
        cells[i].innerHTML = (isMaximizing) ? 'O' : 'X';
        const score = minimaxScore(cells, depth + 1, !isMaximizing);
        cells[i].innerHTML = '';

        scores.push(score);
      }
    }

    return (isMaximizing) ? Math.max(...scores) : Math.min(...scores);
  }

  function checkWinner() {
    // ... (mesmo código de verificação de vencedor)
  }

  function isBoardFull() {
    // ... (mesmo código de verificação de tabuleiro cheio)
  }

  function updateScore() {
    // ... (mesmo código de atualização do placar)
  }

  function resetBoard() {
    // ... (mesmo código de reinicialização do tabuleiro)
  }

  function changeDifficulty() {
    difficulty = document.getElementById('difficulty').value;
    resetBoard();
  }
</script>

</body>
</html>
