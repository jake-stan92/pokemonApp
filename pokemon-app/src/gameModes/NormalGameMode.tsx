import og151 from "../assets/og151";
import { useEffect, useState, useCallback } from "react";
import type { SinglePokemon } from "../components/GameContainerTypes";

function NormalGameMode() {
  const allPokemon: SinglePokemon[] = og151;

  const [remainingPokemon, setRemainingPokemon] = useState<SinglePokemon[]>([]);
  const [activePokemon, setActivePokemon] = useState<SinglePokemon | null>(
    null
  );
  const [allAnswers, setAllAnswers] = useState<SinglePokemon[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const startGame = () => {
    setGameOver(false);
    setActivePokemon(null); // Clear previous pokemon
    setSelectedAnswer(""); // Clear previous guess
    setAllAnswers([]); // Clear answer buttons
    setScore(0);
    setRemainingPokemon(allPokemon);
    setGameStarted(true); // Triggers useEffect to start the first round
  };

  const playRound = useCallback(() => {
    setSelectedAnswer(""); // Reset selection

    setRemainingPokemon((prev) => {
      if (prev.length === 0) {
        setGameOver(true);
        return [];
      }

      // Pick random active Pokémon from remaining
      const randomIndex = Math.floor(Math.random() * prev.length);
      const newActive = prev[randomIndex];
      setActivePokemon(newActive);

      const updatedRemaining = prev.filter(
        (pokemon) => pokemon.name !== newActive.name
      );

      // Get 3 incorrect answers from the FULL POKEDEX
      const incorrectAnswers: SinglePokemon[] = [];
      while (incorrectAnswers.length < 3) {
        const candidate =
          allPokemon[Math.floor(Math.random() * allPokemon.length)];
        if (
          candidate.name !== newActive.name &&
          !incorrectAnswers.some((p) => p.name === candidate.name)
        ) {
          incorrectAnswers.push(candidate);
        }
      }

      // Combine and shuffle
      const options = [newActive, ...incorrectAnswers];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      setAllAnswers(options);
      return updatedRemaining;
    });
  }, [allPokemon]);

  useEffect(() => {
    if (!selectedAnswer || !activePokemon) return;

    if (selectedAnswer === activePokemon.name) {
      setScore((prev) => prev + 1);
      setTimeout(() => playRound(), 300); // Small delay to let user see result
    } else {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [selectedAnswer, activePokemon, playRound]);

  // Start first round when game starts
  useEffect(() => {
    if (gameStarted) {
      playRound();
    }
  }, [gameStarted, playRound]);

  return (
    <>
      <h1>Normal Game Mode</h1>

      {!gameStarted && !gameOver && (
        <button onClick={startGame}>Start Game</button>
      )}

      {gameStarted && !gameOver && activePokemon && (
        <>
          <p>Score: {score}</p>
          <p>Who's that Pokémon?</p>
          <img src={activePokemon!.spriteFront}></img>
          {allAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(answer.name)}
              disabled={!!selectedAnswer} // prevent double clicks
            >
              {answer.name}
            </button>
          ))}
        </>
      )}

      {gameOver && (
        <>
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </>
      )}
    </>
  );
}

export default NormalGameMode;
