import moviesManager from "./services/MoviesManager";

export const setupPerformRequest = (element, onGetMoviesCb) => {
  element.addEventListener("click", async () => {
    try {
      const movies = await moviesManager.getMovies();
      onGetMoviesCb(movies);
    } catch (err) {
      console.log(err);
    }
  });
};

export const setupPerformDelete = (element, onDeleteMovieCb) => {
  element.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("delete-movie-btn")) {
      return;
    }
    const id = e.target.closest(".movie-card").id;
    try {
      await moviesManager.deleteMovie(id);
    } catch (err) {
      console.log(err);
    }
  });
};
