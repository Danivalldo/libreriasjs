import "./style.sass";
import loginManager from "./services/LoginManager";
import registerManager from "./services/RegisterManager";
import moviesManager from "./services/MoviesManager";
import toastNotifications from "./services/ToastNotifications";
import { setupMoviesUI } from "./services/setupMoviesUI";

const loginView = document.querySelector(".login-view");
const formLogin = loginView.querySelector("form.login-form");
const formRegister = loginView.querySelector("form.register-form");
const moviesView = document.querySelector("#movies-view");
const formCreateMovie = moviesView.querySelector("form.movie-form");
const moviesContainer = moviesView.querySelector("#moviesContainer");

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
    toastNotifications.launchNotification(`Bienvenido ${usernameInput.value}`);
    loginView.classList.add("hidden");
    moviesView.classList.remove("hidden");
    const movies = await moviesManager.getMovies();
    updateMovies(movies);
  } catch (err) {
    return toastNotifications.launchNotification(err.message, "error");
  } finally {
    usernameInput.value = "";
    passInput.value = "";
  }
});

loginView.addEventListener("click", (e) => {
  if (!e.target.classList.contains("toggle-sign-btn")) {
    return;
  }
  e.preventDefault();
  formLogin.classList.toggle("hidden");
  formRegister.classList.toggle("hidden");
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
    toastNotifications.launchNotification("Usuario registrado correctamente!");
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

formCreateMovie.addEventListener("click", (e) => {
  if (!e.target.classList.contains("star-btn")) {
    return;
  }
  const score = Number(e.target.dataset.score);
  formCreateMovie.querySelector('input[name="score"]').value = score;
  formCreateMovie.querySelectorAll(".star-btn").forEach((el, i) => {
    el.classList.remove("active");
    if (i + 1 <= score) {
      el.classList.add("active");
    }
  });
});
