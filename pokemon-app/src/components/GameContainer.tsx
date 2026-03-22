import NormalGameMode from "../gameModes/NormalGameMode";
import "./GameContainer.css";

type GameContainerProps = {
  gameModeChosen: boolean;
  setGameModeChosen: (value: boolean) => void;
  gameMode: string;
  setGameMode: (value: string) => void;
};

function GameContainer({
  gameMode,
  gameModeChosen,
  setGameMode,
  setGameModeChosen,
}: GameContainerProps) {
  return (
    <>
      {!gameModeChosen && (
        <>
          <h1>Choose Game Mode</h1>
          <div className="game-mode-selection">
            <button
              className="game-mode-selection-button"
              id="game-mode-select-button-normal"
              onClick={() => {
                console.log("game mode = normal");
                setGameMode("normal");
                setGameModeChosen(true);
              }}
            >
              Normal
            </button>
            {/* <button
            className="game-mode-selection-button"
            id="game-mode-select-button-normal-timed"
            onClick={() => {
              console.log("game mode = normal-timed");
              setGameMode("normal-timed");
              setGameModeChosen(true);
            }}
          >
            Normal - Timed
          </button> */}
            <button className="game-mode-selection-button">???</button>
          </div>
        </>
      )}

      {gameMode === "normal" && gameModeChosen && (
        <>
          <NormalGameMode />
        </>
      )}
    </>
  );
}

export default GameContainer;
