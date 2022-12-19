import "./Cell.css";

interface CellProps {
  value: string;
  onClick: (row: number, col: number) => void;
  row: number;
  col: number;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, row, col }) => {
  return (
    <button className="cellButton" onClick={() => onClick(row, col)}>
      {value}
    </button>
  );
};
