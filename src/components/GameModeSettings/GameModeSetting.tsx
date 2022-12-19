import React from "react";
import "./GameModeSetting.css";

const GameModeVariants = {
  PlayerVsPlayer: "Player vs. Player",
  PlayerVsComputer: "Player vs. Computer",
  ComputerVsComputer: "Computer vs. Computer (Demo)",
};

interface GameModeSettingProps {
  onChange: (mode: string) => void;
}

export const GameModeSetting: React.FC<GameModeSettingProps> = ({
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="gameModeContainer">
      <label>
        <input
          type="radio"
          name="mode"
          value="Player vs. Player"
          onChange={handleChange}
          defaultChecked
        />
        {GameModeVariants.PlayerVsPlayer}
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="Player vs. Computer"
          onChange={handleChange}
        />
        {GameModeVariants.PlayerVsComputer}
      </label>

      <label>
        <input
          type="radio"
          name="mode"
          value="Computer vs. Computer (Demo)"
          onChange={handleChange}
        />
        {GameModeVariants.ComputerVsComputer}
      </label>
    </div>
  );
};
