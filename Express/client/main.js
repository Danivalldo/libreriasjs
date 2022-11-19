import "./style.sass";
import loginManager from "./services/LoginManager";
import registerManager from "./services/RegisterManager";
import moviesManager from "./services/MoviesManager";
import toastNotifications from "./services/ToastNotifications";
import { setupMoviesUI } from "./services/setupMoviesUI";

const formLogin = document.querySelector("form.login-form");
const formRegister = document.querySelector("form.register-form");
const formCreateMovie = document.querySelector("form.movie-form");
const moviesContainer = document.querySelector("#moviesContainer");

const updateMovies = setupMoviesUI(moviesContainer);

moviesContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-movie-btn")) {
    const id = e.target.closest(".movie-card").id;
    try {
      await moviesManager.deleteMovie(id);
      const movies = await moviesManager.getMovies();
      updateMovies(movies);
    } catch (err) {
      console.log(err);
    }
  }
  if (e.target.classList.contains("star-btn")) {
    const id = e.target.closest(".movie-card").id;
    const score = Number(e.target.dataset.score);
    try {
      await moviesManager.updateMovie(id, { score });
      const movies = await moviesManager.getMovies();
      updateMovies(movies);
    } catch (err) {
      console.log(err);
    }
  }
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = e.target.querySelector('input[name="username"]');
  const passInput = e.target.querySelector('input[name="password"]');
  try {
    const token = await loginManager.login(
      usernameInput.value,
      passInput.value
    );
    console.log(token);
    const movies = await moviesManager.getMovies();
    updateMovies(movies);
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  } finally {
    usernameInput.value = "";
    passInput.value = "";
  }
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = e.target.querySelector('input[name="username"]');
  const passInput = e.target.querySelector('input[name="password"]');
  const repeatedPassInput = e.target.querySelector(
    'input[name="repeated-password"]'
  );
  try {
    await registerManager.register(
      usernameInput.value,
      passInput.value,
      repeatedPassInput.value
    );
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  } finally {
    usernameInput.value = "";
    passInput.value = "";
    repeatedPassInput.value = "";
  }
});

formCreateMovie.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movieNameInput = e.target.querySelector('input[name="name"]');
  const movieScoreInput = e.target.querySelector('input[name="score"]');
  try {
    await moviesManager.addMovie({
      name: movieNameInput.value,
      score: Number(movieScoreInput.value),
    });
    const movies = await moviesManager.getMovies();
    updateMovies(movies);
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  } finally {
    movieNameInput.value = "";
    movieScoreInput.value = 1;
  }
});
