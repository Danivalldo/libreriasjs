import { useState, useEffect, useCallback } from "react";
import words from "./services/words";
import wordleGuess from "./services/wordGuess";
import Word from "./compontents/Word";
import Attempts from "./compontents/Attempts";
import "./App.css";

const sizeWord = 5;
const maxAttempts = 5;

//random value in array
const randomWord = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

function App() {
  const fillWithNull = (max) => {
    const arr = [];
    for (let i = 0; i < max; i++) {
      arr.push(null);
    }
    return arr;
  };

  const [word, setWord] = useState(randomWord(words));

  const [gameOver, setGameOver] = useState(false);

  const [attempts, setAttempts] = useState([
    {
      guessed: fillWithNull(sizeWord),
    },
  ]);

  const fillNextLetter = (guessed, letter) => {
    for (let i = 0; i < guessed.length; i++) {
      if (guessed[i] === null) {
        guessed[i] = letter.toLocaleUpperCase();
        return guessed;
      }
    }
    return guessed;
  };

  const removeLastLetter = (guessed) => {
    for (let i = 0; i < guessed.length; i++) {
      if (!guessed[i + 1] || guessed[i + 1] === null) {
        guessed[i] = null;
        return guessed;
      }
    }
    return guessed;
  };

  const handleOnKeyUp = useCallback(
    (e) => {
      e.preventDefault();
      if (gameOver) {
        return;
      }
      if (e.key === "Backspace") {
        return setAttempts((prevAttempts) => {
          const nextGuessed = removeLastLetter(
            prevAttempts[prevAttempts.length - 1].guessed
          );
          prevAttempts[prevAttempts.length - 1] = {
            guessed: nextGuessed,
          };
          return [...prevAttempts];
        });
      }
      if ((e.which >= 65 && e.which <= 90) || e.which === 186) {
        return setAttempts((prevAttempts) => {
          const nextGuessed = fillNextLetter(
            prevAttempts[prevAttempts.length - 1].guessed,
            e.key
          );

          prevAttempts[prevAttempts.length - 1] = {
            guessed: nextGuessed,
          };
          return [...prevAttempts];
        });
      }
      if (e.key === "Enter") {
        return setAttempts((prevAttempts) => {
          if (
            prevAttempts[prevAttempts.length - 1].guessed[
              prevAttempts[prevAttempts.length - 1].guessed.length - 1
            ] === null
          ) {
            return [...prevAttempts];
          }

          const updatedAttemps = [...prevAttempts];
          const resultGuessed = wordleGuess(
            prevAttempts[prevAttempts.length - 1].guessed.join(""),
            word
          );
          const idResult = resultGuessed.join("");
          updatedAttemps[updatedAttemps.length - 1].result = resultGuessed;
          if (updatedAttemps.length >= maxAttempts || idResult === "22222") {
            setGameOver({
              won: idResult === "22222",
            });
            return updatedAttemps;
          }
          updatedAttemps.push({
            guessed: fillWithNull(sizeWord),
          });
          return updatedAttemps;
        });
      }
    },
    [gameOver, word]
  );

  const handleRestart = () => {
    setAttempts([
      {
        guessed: fillWithNull(sizeWord),
      },
    ]);
    setGameOver(false);
    setWord(randomWord(words));
  };

  useEffect(() => {
    window.addEventListener("keyup", handleOnKeyUp);
    return () => {
      window.removeEventListener("keyup", handleOnKeyUp);
    };
  }, [gameOver, word]);

  return (
    <div className="App">
      <Attempts attempts={attempts.length} maxAttempts={5} />
      {attempts.map((attempt, i) => {
        return <Word key={i} word={attempt.guessed} result={attempt.result} />;
      })}
      {gameOver && (
        <>
          <p>You {gameOver.won ? "WON!" : `LOSE, the word was ${word}`}</p>
          <button onClick={handleRestart}>Restart</button>
        </>
      )}
    </div>
  );
}

export default App;
