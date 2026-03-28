import "./Header.css";

type HeaderProps = {
  gameModeChosen: boolean;
  setGameModeChosen: (value: boolean) => void;
};

export default function Header({
  gameModeChosen,
  setGameModeChosen,
}: HeaderProps) {
  function handleMainMenuClick() {
    const confirmed = window.confirm(
      "Are you sure you want to quit? All progress will be lost!",
    );

    if (confirmed) {
      // go to main menu
      setGameModeChosen(false);
    } else {
      // stay in game
    }
  }

  return (
    <div id="header">
      {gameModeChosen ? (
        <>
          {/* <div className="game-mode-container">game mode container</div> */}
          <button
            id="main-menu-button"
            // onClick={() => setGameModeChosen(false)}
            onClick={() => handleMainMenuClick()}
          >
            &#x2190; Main Menu
          </button>
        </>
      ) : (
        <div className="header-placeholder"></div>
      )}
    </div>
  );
}
