const checkGameOver = (
  board: string[][],
  player: string,
  winLength: number
) => {
  const checkRows = () => {
    for (let i = 0; i < board.length; i++) {
      let count = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === player) {
          count++;
        } else {
          count = 0;
        }
        if (count === winLength) {
          return true;
        }
      }
    }
    return false;
  };

  const checkColumns = () => {
    for (let i = 0; i < board[0].length; i++) {
      let count = 0;
      for (let j = 0; j < board.length; j++) {
        if (board[j][i] === player) {
          count++;
        } else {
          count = 0;
        }
        if (count === winLength) {
          return true;
        }
      }
    }
    return false;
  };

  const checkDiagonals = () => {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][i] === player) {
        count++;
      } else {
        count = 0;
      }
      if (count === winLength) {
        return true;
      }
    }

    count = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][board.length - i - 1] === player) {
        count++;
      } else {
        count = 0;
      }
      if (count === winLength) {
        return true;
      }
    }
    return false;
  };

  const gameOver = checkRows() || checkColumns() || checkDiagonals();
  return { gameOver, winner: gameOver ? player : null };
};

export default checkGameOver;
