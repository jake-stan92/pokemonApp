import React, { useEffect } from "react";
import NormalGameMode from "../gameModes/NormalGameMode";
import type { SinglePokemon } from "./GameContainerTypes";
import og151 from "../assets/og151";

function GameContainer() {
  const [gameMode, setGameMode] = React.useState<string>("");
  const [gameModeChosen, setGameModeChosen] = React.useState<boolean>(false);
  // const allPokemon: SinglePokemon[] = og151;

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
