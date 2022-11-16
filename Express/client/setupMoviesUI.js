const buildMovieCard = ({ id, name, score }) => {
  return `
    <div id="${id}" class="movie-card">
      <h2>${name}</h2>
      <p>
        <ul>
          <li class="${score >= 1 ? "active" : ""}">★</li>
          <li class="${score >= 2 ? "active" : ""}">★</li>
          <li class="${score >= 3 ? "active" : ""}">★</li>
          <li class="${score >= 4 ? "active" : ""}">★</li>
          <li class="${score >= 5 ? "active" : ""}">★</li>
        </ul>
      </p>
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
