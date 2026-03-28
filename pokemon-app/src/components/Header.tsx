import "./Header.css";

type HeaderProps = {
  gameModeChosen: boolean;
  setGameModeChosen: (value: boolean) => void;
};

export default function Header({
  gameModeChosen,
  setGameModeChosen,
}: HeaderProps) {
  return (
    <div id="header">
      {gameModeChosen ? (
        <>
          {/* <div className="game-mode-container">game mode container</div> */}
          <button
            id="main-menu-button"
            onClick={() => setGameModeChosen(false)}
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
