import "./style.css";
import { setupPerformRequest, setupPerformDelete } from "./performRequest";
import { setupLogin } from "./setupLogin";
import { setupMoviesUI } from "./setupMoviesUI";

const updateMovies = setupMoviesUI(document.querySelector("#moviesContainer"));

const onGetMovies = (movies) => {
  updateMovies(movies);
};

const onDeleteMovie = () => {};

const onLoginSuccess = () => {};

const onLogOutSuccess = () => {};

setupPerformRequest(document.querySelector("#fetchBtn"), onGetMovies);
setupPerformDelete(document.querySelector("#moviesContainer"), onDeleteMovie);

setupLogin(
  document.querySelector("form.login-form"),
  onLoginSuccess,
  onLogOutSuccess
);
