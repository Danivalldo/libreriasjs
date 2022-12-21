export const buildScoreSelector = (score = 0) => {
  return `
  <ul>
    <li class="${score >= 1 ? "active" : ""} star-btn" data-score="1">★</li>
    <li class="${score >= 2 ? "active" : ""} star-btn" data-score="2">★</li>
    <li class="${score >= 3 ? "active" : ""} star-btn" data-score="3">★</li>
    <li class="${score >= 4 ? "active" : ""} star-btn" data-score="4">★</li>
    <li class="${score >= 5 ? "active" : ""} star-btn" data-score="5">★</li>
  </ul>
  `;
};

const buildMovieCard = ({ id, name, score }) => {
  return `
    <div id="${id}" class="movie-card">
      <h2>${name}</h2>
      ${buildScoreSelector(score)}
      <div>
        <button class="delete-movie-btn" type="button">Delete</button>
      </div>
    </div>
  `;
};

export const setupMoviesUI = (element) => {
  return (movies) => {
    element.innerHTML = "";
    for (let i = 0, j = movies.length; i < j; i++) {
      element.innerHTML = element.innerHTML + buildMovieCard(movies[i]);
    }
  };
};
