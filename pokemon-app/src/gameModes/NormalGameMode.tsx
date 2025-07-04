import og151 from "../assets/og151";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { SinglePokemon } from "../components/GameContainerTypes";
import type { GameEndQuoteGroup } from "./NormalGameModes";

function NormalGameMode() {
  // Limit pool for testing — change slice size as needed
  const allPokemon: SinglePokemon[] = og151; // must be at least 4 for multiple options portion of test

  const gameEndQuotes: GameEndQuoteGroup[] = useMemo(
    () => [
      {
        minScorePercent: 0,
        maxScorePercent: 0.25,
        quotes: [
          "Looks like your Poké Balls need some practice. Keep training, Trainer!",
          "Don’t give up! Even Ash had to start somewhere.",
          "Your Pokémon might be shaking in their boots… but so is your confidence!",
          "Time to head back to Professor Oak’s lab for some study.",
          "Every Master was once a beginner — your journey’s just starting.",
        ],
      },
      {
        minScorePercent: 0.25,
        maxScorePercent: 0.5,
        quotes: [
          "Not bad, Trainer — you’re catching on! Keep your Pokédex ready.",
          "You’ve got some spark! With more training, you’ll be unstoppable.",
          "Halfway there! Time to level up and show them what you’ve got.",
          "A good start! Now it’s time to power up your team.",
          "Your Pokémon believe in you — now it’s time to believe in yourself.",
        ],
      },
      {
        minScorePercent: 0.5,
        maxScorePercent: 0.75,
        quotes: [
          "Great job, Trainer! Your skills are evolving fast.",
          "Strong, smart, and ready for the next challenge!",
          "You’ve got the heart of a Champion — keep battling forward!",
          "You’re becoming a true Pokémon Trainer. The Elite Four will be next!",
          "Your Pokédex is filling up nicely — keep up the good work!",
        ],
      },
      {
        minScorePercent: 0.75,
        maxScorePercent: 0.99,
        quotes: [
          "Impressive! You’re almost a Pokémon Master!",
          "The Pokémon League won’t know what hit them!",
          "Your Pokémon trust you — and so do we. Keep pushing forward!",
          "Your journey is legendary — just a few steps from greatness.",
          "You’ve caught them all… almost. The Hall of Fame awaits!",
        ],
      },
      {
        minScorePercent: 0.99,
        maxScorePercent: 1,
        quotes: [
          "Congratulations, Pokémon Master! The world is your Poké Ball!",
          "You’ve caught them all! A true Champion among Trainers.",
          "Legendary status achieved — the Pokémon League salutes you!",
          "The ultimate Trainer! Your name will be remembered in Kanto forever.",
          "Pokémon Master confirmed. The adventure never ends!",
        ],
      },
    ],
    [],
  );

  const [remainingPokemon, setRemainingPokemon] = useState<SinglePokemon[]>([]);
  const [activePokemon, setActivePokemon] = useState<SinglePokemon | null>(
    null,
  );
  const [allAnswers, setAllAnswers] = useState<SinglePokemon[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameEndQuote, setGameEndQuote] = useState<string>("");

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
    setGameEndQuote("");
  };

  const playRound = useCallback(
    // use callback avoids func being re-created each render -- react remembers it
    (pokemonPool: SinglePokemon[]) => {
      if (pokemonPool.length === 0) {
        return;
      }

      const randomIndex = Math.floor(Math.random() * pokemonPool.length);
      const chosenPokemon = pokemonPool[randomIndex];

      setActivePokemon(chosenPokemon);
      setRemainingPokemon(
        pokemonPool.filter((p) => p.name !== chosenPokemon.name),
      );

      // Create 3 incorrect answers
      const incorrectAnswers: SinglePokemon[] = [];
      while (incorrectAnswers.length < 3) {
        const candidate =
          allPokemon[Math.floor(Math.random() * allPokemon.length)];
        if (
          candidate.name !== chosenPokemon.name &&
          !incorrectAnswers.some((p) => p.name === candidate.name)
        ) {
          incorrectAnswers.push(candidate);
        }
      }

      const options = [chosenPokemon, ...incorrectAnswers];

      // Shuffle answers (fisher yates shuffle)
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      setAllAnswers(options);
    },
    [allPokemon],
  );

  // On game start or after correct guess
  useEffect(() => {
    if (gameStarted && remainingPokemon.length > 0 && !activePokemon) {
      playRound(remainingPokemon);
    }
    // check game won/completed
    if (
      gameStarted &&
      remainingPokemon.length === 0 &&
      activePokemon === null
    ) {
      const randomQuoteIndex = Math.floor(
        Math.random() * gameEndQuotes[4].quotes.length,
      );
      const quote = gameEndQuotes[4].quotes[randomQuoteIndex];
      setGameEndQuote(quote);
      setGameCompleted(true);
      setGameStarted(false);
    }
  }, [gameStarted, remainingPokemon, activePokemon, playRound, gameEndQuotes]);

  // Handle user's answer
  useEffect(() => {
    if (!selectedAnswer || !activePokemon) return;

    if (selectedAnswer === activePokemon.name) {
      // add 1 for correct answer
      setScore((prevScore) => prevScore + 1);
      setSelectedAnswer(""); // Clear for next round
      setActivePokemon(null); // Triggers next round
    } else {
      // end round if incorrect answer given
      setGameOver(true);
      setGameStarted(false);
      const percentScore = score / allPokemon.length;

      const quoteGroup =
        gameEndQuotes.find(
          (group) =>
            percentScore >= group.minScorePercent &&
            percentScore < group.maxScorePercent,
        ) ?? gameEndQuotes[0];

      const randomQuoteIndex = Math.floor(
        Math.random() * quoteGroup.quotes.length,
      );
      const quote = quoteGroup.quotes[randomQuoteIndex];
      setGameEndQuote(quote);
    }
  }, [selectedAnswer, activePokemon, score, allPokemon.length, gameEndQuotes]);

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
          <p>The correct answer was: {activePokemon!.name.toUpperCase()}</p>
          <p>Your final score: {score}</p>
          <p>{gameEndQuote}</p>
          <button onClick={startGame}>Play Again</button>
        </>
      )}

      {gameCompleted && (
        <>
          <h2>🎉 You did it!</h2>
          <p>You correctly guessed all {allPokemon.length} Pokémon!</p>
          <p>Final Score: {score}</p>
          <p>{gameEndQuote}</p>
          <button onClick={startGame}>Play Again</button>
        </>
      )}
    </>
  );
}

export default NormalGameMode;
