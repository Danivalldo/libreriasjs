import "./style.css";
import loginManager from "./services/LoginManager";
import moviesManager from "./services/MoviesManager";
import { setupMoviesUI } from "./setupMoviesUI";

const formElement = document.querySelector("form.login-form");
const getMoviesBtn = document.querySelector("#fetchBtn");
const moviesContainer = document.querySelector("#moviesContainer");

const updateMovies = setupMoviesUI(moviesContainer);

getMoviesBtn.addEventListener("click", async () => {
  try {
    const movies = await moviesManager.getMovies();
    updateMovies(movies);
  } catch (err) {
    console.log(err);
  }
});

moviesContainer.addEventListener("click", async (e) => {
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

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = e.target.querySelector('input[name="username"]');
  const passInput = e.target.querySelector('input[name="password"]');
  const username = usernameInput.value;
  const pass = passInput.value;
  usernameInput.value = "";
  passInput.value = "";
  if (!username || !pass) {
    return;
  }
  const token = await loginManager.login(username, pass);
  console.log(token);
});
