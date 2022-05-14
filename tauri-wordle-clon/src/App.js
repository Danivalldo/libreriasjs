import { useState, useEffect, useCallback } from "react";
import words from "./services/words";
import wordleGuess from "./services/wordGuess";
import Word from "./compontents/Word";
import Attempts from "./compontents/Attempts";
import Modal from "./compontents/Modal";
import Logo from "./resources/logo_wordle_clon.svg";
import "./App.css";

// Constantes para el número de carácteres de las palabras
// y número máximo de intentos
const sizeWord = 5;
const maxAttempts = 5;

//Funcion para obtener un valor aleatorio de un array
const randomWord = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

//Componente principal
function App() {
  // funcion para rellenar de "nulls" un array hasta un máximo dado
  const fillWithNull = (max) => {
    const arr = [];
    for (let i = 0; i < max; i++) {
      arr.push(null);
    }
    return arr;
  };

  // State interno para setear la palabra a encontrar
  // Inicialmente selecciona una aleatoria dentro de un grupo
  const [word, setWord] = useState(randomWord(words));

  //State boleano para setear si el juego ha terminado
  const [gameOver, setGameOver] = useState(false);

  //State para guardar los intentos
  const [attempts, setAttempts] = useState([
    {
      guessed: fillWithNull(sizeWord),
    },
  ]);

  //Funcion para rellenar con una letra, la palabra del intento actual
  //Busca la primera coincidencia con null, y substituye su valor por la letra seleccionada
  const fillNextLetter = (guessed, letter) => {
    for (let i = 0; i < guessed.length; i++) {
      if (guessed[i] === null) {
        guessed[i] = letter.toLocaleUpperCase();
        return guessed;
      }
    }
    return guessed;
  };

  //Funcion para eliminar la ultima letra del actual intento
  const removeLastLetter = (guessed) => {
    for (let i = 0; i < guessed.length; i++) {
      if (!guessed[i + 1] || guessed[i + 1] === null) {
        guessed[i] = null;
        return guessed;
      }
    }
    return guessed;
  };

  //Funcion callback que se ejecuta al soltar una tecla del tecaldo
  //En funcion del tipo de key, se ejecuta una instrucción u otra, actualizando los estados correspondientes
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

  //Funcion para resetear el juego
  const handleRestart = () => {
    setAttempts([
      {
        guessed: fillWithNull(sizeWord),
      },
    ]);
    setGameOver(false);
    setWord(randomWord(words));
  };

  //useEffect para añadir y refrescar los listeners de teclado
  useEffect(() => {
    window.addEventListener("keyup", handleOnKeyUp);
    return () => {
      window.removeEventListener("keyup", handleOnKeyUp);
    };
  }, [gameOver, word]);

  return (
    <div className="App">
      <div className="logo-wrapper">
        <img src={Logo} alt="" />
      </div>
      <div className="words-wrapper">
        {attempts.map((attempt, i) => {
          return (
            <Word key={i} word={attempt.guessed} result={attempt.result} />
          );
        })}
      </div>
      {
        <Modal active={gameOver ? true : false}>
          {!gameOver.won && (
            <div>
              <h1>Has perdido 😔</h1>
              <p>La palabra era {word}</p>
            </div>
          )}
          {gameOver.won && (
            <div>
              <h1>La has encontrado!😊</h1>
              <p>Lo has logrado en {attempts.length} intentos</p>
            </div>
          )}
          {/* <p>You {gameOver.won ? "WON!" : `LOSE, the word was ${word}`}</p> */}
          <button onClick={handleRestart} className="btn">
            Reiniciar
          </button>
        </Modal>
      }
      <div>
        <Attempts attempts={attempts.length} maxAttempts={5} />
      </div>
    </div>
  );
}

export default App;
