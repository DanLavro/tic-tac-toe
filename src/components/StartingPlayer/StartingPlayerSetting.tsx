import React from "react";
import "./StartingPlayerSetting.css";

interface StartingPlayerSettingProps {
  startingPlayer: string;
  setStartingPlayer: (player: string) => void;
}

const StartingPlayerSetting: React.FC<StartingPlayerSettingProps> = ({
  startingPlayer,
  setStartingPlayer,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartingPlayer(event.target.value);
  };

  return (
    <div className="startingPlayerContainer">
      Starting Player:
      <select value={startingPlayer} onChange={handleChange}>
        <option value="Player">Player</option>
        <option value="Computer">Computer</option>
      </select>
    </div>
  );
};

export default StartingPlayerSetting;
