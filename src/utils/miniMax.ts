import checkGameOver from "./checkGameOver";

const minimax = (
  board: string[][],
  player: string,
  winLength: number
): { row: number; col: number; score: number } => {
  let emptyCells = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        emptyCells = true;
        break;
      }
    }
  }
  if (!emptyCells) {
    return { row: -1, col: -1, score: 0 };
  }

  const gameOverResults = checkGameOver(board, player, winLength);
  if (gameOverResults.gameOver) {
    if (gameOverResults.winner === "O") {
      return { row: -1, col: -1, score: 1 };
    } else if (gameOverResults.winner === "X") {
      return { row: -1, col: -1, score: -1 };
    } else {
      return { row: -1, col: -1, score: 0 };
    }
  }

  const moves: { row: number; col: number; score: number }[] = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        const move = { row: i, col: j, score: 0 };

        board[i][j] = player;
        if (player === "O") {
          move.score = minimax(board, "X", winLength).score;
        } else {
          move.score = minimax(board, "O", winLength).score;
        }
        board[i][j] = "";
        moves.push(move);
      }
    }
  }

  let bestMove: { row: number; col: number; score: number };
  if (moves.length === 0) {
    return { row: -1, col: -1, score: 0 };
  } else if (player === "O") {
    bestMove = moves.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );
  } else {
    bestMove = moves.reduce((prev, current) =>
      prev.score < current.score ? prev : current
    );
  }

  return { row: bestMove.row, col: bestMove.col, score: bestMove.score };
};

export default minimax;
