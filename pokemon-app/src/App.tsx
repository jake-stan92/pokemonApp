import React from "react";
import "./App.css";
import Header from "./components/Header";
import GameContainer from "./components/GameContainer";

function App() {
  const [gameMode, setGameMode] = React.useState<string>("");
  const [gameModeChosen, setGameModeChosen] = React.useState<boolean>(false);
  return (
    <>
      <Header
        gameModeChosen={gameModeChosen}
        setGameModeChosen={setGameModeChosen}
      />
      <GameContainer
        gameMode={gameMode}
        setGameMode={setGameMode}
        gameModeChosen={gameModeChosen}
        setGameModeChosen={setGameModeChosen}
      />
    </>
  );
}

export default App;
