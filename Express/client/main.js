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
  const username = usernameInput.value;
  const pass = passInput.value;
  usernameInput.value = "";
  passInput.value = "";
  if (!username || !pass) {
    return toastNotifications.launchNotification(
      "Necesitas introducir usuario y contraseña"
    );
  }
  try {
    const token = await loginManager.login(username, pass);
    console.log(token);
    const movies = await moviesManager.getMovies();
    updateMovies(movies);
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  }
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = e.target.querySelector('input[name="username"]');
  const passInput = e.target.querySelector('input[name="password"]');
  const repeatedPassInput = e.target.querySelector(
    'input[name="repeated-password"]'
  );
  if (passInput.value !== repeatedPassInput.value) {
    return toastNotifications.launchNotification("La contraseña no coincide");
  }
  const username = usernameInput.value;
  const pass = passInput.value;
  usernameInput.value = "";
  passInput.value = "";
  repeatedPassInput.value = "";
  try {
    await registerManager.register(username, pass);
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  }
});

formCreateMovie.addEventListener("submit", async (e) => {
  e.preventDefault();
  const movieNameInput = e.target.querySelector('input[name="name"]');
  const movieScoreInput = e.target.querySelector('input[name="score"]');
  const newMovie = {
    name: movieNameInput.value,
    score: Number(movieScoreInput.value),
  };
  movieNameInput.value = "";
  movieScoreInput.value = "";
  try {
    moviesManager.addMovie(newMovie);
    const movies = await moviesManager.getMovies();
    updateMovies(movies);
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  }
});
