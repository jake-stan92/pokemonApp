import React from "react";
import NormalGameMode from "../gameModes/NormalGameMode";

function GameContainer() {
  const [gameMode, setGameMode] = React.useState<string>("");
  const [gameModeChosen] = React.useState<boolean>(false);
  return (
    <>
      {!gameModeChosen && (
        <div className="game-mode-selection">
          <h1>Choose Game Mode</h1>
          <button
            className="game-mode-selection-button"
            id="game-mode-select-button-normal"
            onClick={() => {
              console.log("game mode = normal");
              setGameMode("normal");
              // setGameModeChosen(true);
            }}
          >
            Normal
          </button>
          <button
            className="game-mode-selection-button"
            id="game-mode-select-button-normal-timed"
            onClick={() => {
              console.log("game mode = normal-timed");
              setGameMode("normal-timed");
              // setGameModeChosen(true);
            }}
          >
            Normal - Timed
          </button>
        </div>
      )}
      <div className="game-mode-container">game mode container</div>
      {gameMode === "normal" && (
        <>
          <NormalGameMode />
        </>
      )}
    </>
  );
}

export default GameContainer;
