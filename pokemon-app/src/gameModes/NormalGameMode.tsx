import og151 from "../assets/og151";
import { useEffect, useState, useCallback } from "react";
import type { SinglePokemon } from "../components/GameContainerTypes";

function NormalGameMode() {
  // Limit pool for testing — change slice size as needed
  const allPokemon: SinglePokemon[] = og151.slice(0, 4); // must be at least 4 for multiple options portion of test

  const [remainingPokemon, setRemainingPokemon] = useState<SinglePokemon[]>([]);
  const [activePokemon, setActivePokemon] = useState<SinglePokemon | null>(
    null
  );
  const [allAnswers, setAllAnswers] = useState<SinglePokemon[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const startGame = () => {
    if (allPokemon.length < 4) {
      alert("You need at least 4 Pokémon to play!");
      return;
    }
    setGameOver(false);
    setGameCompleted(false);
    setGameStarted(true);
    setScore(0);
    setSelectedAnswer("");
    setAllAnswers([]);
    setActivePokemon(null);
    setRemainingPokemon([...allPokemon]); // reset the pool
  };

  const playRound = useCallback(
    (pool: SinglePokemon[]) => {
      if (pool.length === 0) {
        return;
      }

      const randomIndex = Math.floor(Math.random() * pool.length);
      const chosen = pool[randomIndex];

      setActivePokemon(chosen);
      setRemainingPokemon(pool.filter((p) => p.name !== chosen.name));

      // Create 3 incorrect answers
      const incorrectAnswers: SinglePokemon[] = [];
      while (incorrectAnswers.length < 3) {
        const candidate =
          allPokemon[Math.floor(Math.random() * allPokemon.length)];
        if (
          candidate.name !== chosen.name &&
          !incorrectAnswers.some((p) => p.name === candidate.name)
        ) {
          incorrectAnswers.push(candidate);
        }
      }

      const options = [chosen, ...incorrectAnswers];

      // Shuffle answers
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      setAllAnswers(options);
    },
    [allPokemon]
  );

  // On game start or after correct guess
  useEffect(() => {
    if (gameStarted && remainingPokemon.length > 0 && !activePokemon) {
      playRound(remainingPokemon);
    }

    if (
      gameStarted &&
      remainingPokemon.length === 0 &&
      activePokemon === null
    ) {
      setGameCompleted(true);
      setGameStarted(false);
    }
  }, [gameStarted, remainingPokemon, activePokemon, playRound]);

  // Handle user's answer
  useEffect(() => {
    if (!selectedAnswer || !activePokemon) return;

    if (selectedAnswer === activePokemon.name) {
      setScore((prev) => prev + 1);
      setSelectedAnswer(""); // Clear for next round
      setActivePokemon(null); // Triggers next round
    } else {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [selectedAnswer, activePokemon]);

  return (
    <>
      <h1>Normal Game Mode</h1>

      {!gameStarted && !gameOver && !gameCompleted && (
        <button onClick={startGame}>Start Game</button>
      )}

      {gameStarted && activePokemon && (
        <>
          <p>Score: {score}</p>
          <p>Who's that Pokémon?</p>
          <img src={activePokemon.spriteFront} alt="Pokemon" />
          <div>
            {allAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(answer.name)}
                disabled={!!selectedAnswer}
              >
                {answer.name}
              </button>
            ))}
          </div>
        </>
      )}

      {gameOver && (
        <>
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </>
      )}

      {gameCompleted && (
        <>
          <h2>🎉 You did it!</h2>
          <p>You correctly guessed all {allPokemon.length} Pokémon!</p>
          <p>Final Score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </>
      )}
    </>
  );
}

export default NormalGameMode;
