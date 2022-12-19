import "./App.css";
import { useState, useEffect } from "react";
import { Board } from "./components/Board/Board";
import { BoardSettings } from "./components/BoardSettings/BoardSettings";
import { GameModeSetting } from "./components/GameModeSettings/GameModeSetting";
import StartingPlayerSetting from "./components/StartingPlayer/StartingPlayerSetting";
import checkGameOver from "./utils/checkGameOver";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<null | string>(null);
  const [fieldSize, setFieldSize] = useState(3);
  const [winLength, setWinLength] = useState(3);
  const [gameMode, setGameMode] = useState("Player vs. Player");
  const [aiThinkingTime, setAiThinkingTime] = useState(200);
  const [aiMakingMove, setAiMakingMove] = useState(false);

  const [startingPlayer, setStartingPlayer] = useState("Player");

  const boardRender = (row: number, col: number) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    const gameOverResults = checkGameOver(newBoard, currentPlayer, winLength);
    if (gameOverResults.gameOver) {
      setGameOver(true);
      setWinner(gameOverResults.winner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const computerMove = () => {
    setAiMakingMove(true);
    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          emptyCells.push([i, j]);
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];

    boardRender(row, col);
    setAiMakingMove(false);
  };

  const handleClick = (row: number, col: number) => {
    if (gameOver || board[row][col] !== "" || aiMakingMove) {
      return;
    }

    boardRender(row, col);
  };

  const handleReset = () => {
    const newBoard = Array(fieldSize)
      .fill("")
      .map(() => Array(fieldSize).fill(""));
    setBoard(newBoard);

    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  const handleFieldSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (value >= 1) {
      setFieldSize(value);
    }
  };

  const handleWinLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (value >= 1) {
      setWinLength(value <= fieldSize ? value : winLength);
    }
  };

  const handleGameModeChange = (mode: string) => {
    if (mode !== "Player vs. Computer") {
      setStartingPlayer("Player");
    }
    handleReset();
    setGameMode(mode);
  };

  useEffect(() => {
    if (
      gameMode === "Player vs. Computer" &&
      startingPlayer === "Computer" &&
      currentPlayer === "X"
    ) {
      setTimeout(() => {
        computerMove();
      }, aiThinkingTime);
      setCurrentPlayer("O");
      setAiThinkingTime(200);
    }
    if (
      gameMode === "Player vs. Computer" &&
      currentPlayer === "O" &&
      startingPlayer === "Player"
    ) {
      setTimeout(() => {
        computerMove();
      }, aiThinkingTime);
      setAiThinkingTime(200);
    } else if (gameMode === "Computer vs. Computer (Demo)") {
      setAiMakingMove(true);
      setAiThinkingTime(400);
      if (!gameOver) {
        setTimeout(() => {
          computerMove();
        }, aiThinkingTime);
      }
    }
  }, [gameMode, currentPlayer, startingPlayer]);

  return (
    <div className="App">
      {gameOver && <div>{winner ? `Winner: ${winner}` : "Draw"}</div>}
      <Board board={board} onClick={handleClick} />
      <BoardSettings
        fieldSize={fieldSize}
        winLength={winLength}
        onFieldSizeChange={handleFieldSizeChange}
        onWinLengthChange={handleWinLengthChange}
      />
      <GameModeSetting onChange={handleGameModeChange} />
      {gameMode === "Player vs. Computer" && (
        <StartingPlayerSetting
          startingPlayer={startingPlayer}
          setStartingPlayer={setStartingPlayer}
        />
      )}
      <button className="resetButton" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
