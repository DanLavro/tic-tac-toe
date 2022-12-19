import "./BoardSettings.css";

interface BoardSettingsProps {
  fieldSize: number;
  winLength: number;
  onFieldSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onWinLengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BoardSettings: React.FC<BoardSettingsProps> = ({
  fieldSize,
  winLength,
  onFieldSizeChange,
  onWinLengthChange,
}) => {
  return (
    <div className="boardSettingsContainer">
      <label>
        Field size:
        <input
          type="number"
          value={fieldSize}
          onChange={(event) => onFieldSizeChange(event)}
        />
      </label>
      <label>
        Win length:
        <input
          type="number"
          value={winLength}
          onChange={(event) => onWinLengthChange(event)}
        />
      </label>
    </div>
  );
};
