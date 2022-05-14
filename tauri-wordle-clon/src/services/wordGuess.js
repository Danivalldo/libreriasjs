/*
 * Función para encotrar coincidencias dada la palabra sugerida y la solución
 */

const wordleGuess = (guess, solution) => {
  // Es necesario que tengan la misma cantidad de carácteres
  if (guess.length !== solution.length) {
    throw new Error("Not valid guess");
  }
  // Guardamos en una array las letras completamente inválidas (para agilizar la comporvación de futuras letras)
  const invalidGuesses = [];
  // Array para entregar el output
  const output = [];

  //Recorremoos la palabra sugerida obteniendo la letra en cada iteración
  for (let i = 0, j = guess.length; i < j; i++) {
    const guessedLetter = guess[i];

    //Si esa letra ya se encuentra en inválidas, guardamos en el output tipo 0,la descartamos directamente y pasamos a la siguente iteración
    if (invalidGuesses.includes(guessedLetter)) {
      output.push(0);
      continue;
    }

    //Si la letra existe en la solución, y además se encuentra en la misma posición, guardamos en el output tipo 2, y pasamos a la siguente iteración
    if (solution[i] === guessedLetter) {
      output.push(2);
      continue;
    }

    //Si nunguno de los anteriores casos se ha dado, recorremos la solución en busca de la letra
    //Si se encuentra en otra posición guardamos 1 en el ouput
    //Si no, guardamos 0
    for (let n = 0, m = solution.length; n < m; n++) {
      const solutionLetter = solution[n];
      if (solutionLetter === guessedLetter) {
        output.push(1);
        break;
      }
      if (n === solution.length - 1) {
        invalidGuesses.push(guessedLetter);
        output.push(0);
      }
    }
  }

  //Al final de las comprovaciones devolvemos el output
  return output;
};

export default wordleGuess;
