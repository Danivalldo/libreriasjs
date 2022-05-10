const wordleGuess = (guess, solution) => {
  if (guess.length !== solution.length) {
    throw new Error("Not valid guess");
  }
  const invalidGuesses = [];
  const output = [];
  for (let i = 0, j = guess.length; i < j; i++) {
    const guessedLetter = guess[i];
    if (invalidGuesses.includes(guessedLetter)) {
      output.push(0);
      continue;
    }
    if (solution[i] === guessedLetter) {
      output.push(2);
      continue;
    }
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
  return output;
};

export default wordleGuess;
