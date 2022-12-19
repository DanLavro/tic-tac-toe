import React from "react";
import { Cell } from "../Cell/Cell";
import "./Board.css";

interface BoardProps {
  board: string[][];
  onClick: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div className="boardContainer">
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell
              key={colIndex}
              value={col}
              onClick={onClick}
              row={rowIndex}
              col={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
