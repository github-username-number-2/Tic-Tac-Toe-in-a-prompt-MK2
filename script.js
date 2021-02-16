(function start() {
  const c = n => !n ? "   " : n - 1 ? "O" : "X", option = prompt("Tic-Tac-Toe\n  1: Single Player Game\n  2: Two Player Game\n  3: How To Play"), game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  let playerTurn = 0, invalid = false, moveIndex = 5, winner, random, p2Move;
  if (["1", "2"].includes(option)) {
    while (!(winner = checkWinner(game)) && option === "1" ? moveIndex-- : true) {
      const move = prompt(`Player ${playerTurn + 1}'s turn\n\n ${c(game[0][0])}|${c(game[0][1])}|${c(game[0][2])}   1|2|3\n ${c(game[1][0])}|${c(game[1][1])}|${c(game[1][2])}   4|5|6\n ${c(game[2][0])}|${c(game[2][1])}|${c(game[2][2])}   7|8|9`);
      if (move === null) break;
      if (game[Math.floor((move - 1) / 3)] === undefined || game[Math.floor((move - 1) / 3)][(move - 1) % 3] !== 0) {
        alert("Invalid input");
        continue;
      }
      game[Math.floor((move - 1) / 3)][(move - 1) % 3] = playerTurn + 1;
      if (option === "1") {
        if (winner = checkWinner(game)) break;
        if (!moveIndex) break;
        p2Move = AIMove(game);
        game[p2Move[0]][p2Move[1]] = 2;
      } else playerTurn ^= 1;
    }
    alert(`Game Over\n\n ${c(game[0][0])}|${c(game[0][1])}|${c(game[0][2])}\n ${c(game[1][0])}|${c(game[1][1])}|${c(game[1][2])}\n ${c(game[2][0])}|${c(game[2][1])}|${c(game[2][2])}\n\n${winner ? "Player " + (option === "1" ? winner || 2 : (playerTurn ^ 1) + 1) + " Wins" : "Tie"}`);
  } else if (option === "3") {
    alert(`-The board on the right containing the numbers is a map of which numbers corrospond to locations on the board\n-Type the number that corrosponds with the move you wish to make and press enter or click "ok"\n-A new pop-up box will appear displaying your move\n-If at any time you want to cancel, click cancel`) || start();
  } else if (option !== null) alert("Invalid input") || start();
  function checkWinner(game) {
    for (let i = 0; i < 6; i++) {
      const a = Math.floor(i / 2);
      if (!game[a].includes(0) && !game[a].includes(i % 2 + 1)) return Math.abs(i % 2 - 2);
      if (
        game[0][a] !== 0 && game[0][a] !== i % 2 + 1 && game[1][a] !== 0 && game[1][a] !== i % 2 + 1 && game[2][a] !== 0 && game[2][a] !== i % 2 + 1
      ) return Math.abs(i % 2 - 2);
    }
    for (let i = 0; i < 4; i++) {
      const a = Math.floor(i / 2) * 2, b = a - 1;
      if (
        game[0][a] !== 0 && game[0][a] !== i % 2 + 1 && game[1][a - b] !== 0 && game[1][a - b] !== i % 2 + 1 && game[2][a - b * 2] !== 0 && game[2][a - b * 2] !== i % 2 + 1
      ) return Math.abs(i % 2 - 2);
    }
  }
  function AIMove(game) {
    for (let i = 0; i < 6; i++) {
      if (game[Math.floor(i / 2)][i % 2] === 1 && game[Math.floor(i / 2)][i % 2 + 1] === 1 && game[Math.floor(i / 2)][Math.abs(i % 2 - 1) * 2] === 0) return [Math.floor(i / 2), Math.abs(i % 2 - 1) * 2];
      if (!i % 2 && game[i / 2][0] === 1 && game[i / 2][2] === 1 && game[i / 2][1] === 0) return [i / 2, 1];
      if (game[i % 2][Math.floor(i / 2)] === 1 && game[i % 2 + 1][Math.floor(i / 2)] === 1 && game[Math.abs(i % 2 - 1) * 2][Math.floor(i / 2)] === 0) return [Math.abs(i % 2 - 1) * 2, Math.floor(i / 2)];
      if (!i % 2 && game[0][i / 2] === 1 && game[2][i / 2] === 1 && game[1][i / 2] === 0) return [1, i / 2];
      if (game[1][1] === 0) return [1, 1];
    }
    while ((random = Math.floor(Math.random() * 9)) + 1 && game[Math.floor((random) / 3)][(random) % 3] !== 0);
    return [Math.floor((random) / 3), (random) % 3];
  }
})();