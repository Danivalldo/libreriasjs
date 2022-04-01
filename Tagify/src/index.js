import Tagify from "@yaireo/tagify";
import { movies } from "./movies";
import "./SCSS/index.scss";

const currentMovieContainer = document.querySelector(".current-movie");
const gifIFrameContainer = currentMovieContainer.querySelector(
  ".gif-iframe-container"
);
const movieTitleContainer = currentMovieContainer.querySelector(".movie-title");
const moviesListContainer = document.querySelector(".movies-list-container ul");

const btnSave = document.querySelector(".btn-save");

const tagify = new Tagify(document.querySelector(".input-tagify"));
let i = 0;

const buildMovieTemplate = (movie, tags) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div>
      <h3 class="text-center">${movie.title}</h3>
      <input type="text" value="${tags
        .map((tag) => tag.value)
        .join(",")}" disabled />
    </div>
  `;
  return li;
};

const saveCurrentMovie = (newMovieData) => {
  let tags = tagify.getInputValue();
  const liElement = buildMovieTemplate(
    newMovieData,
    tags ? JSON.parse(tags) : []
  );
  moviesListContainer.appendChild(liElement);
  new Tagify(liElement.querySelector("input"), {});
  tagify.removeAllTags();
  tagify.DOM.input.focus();
};

const loadMovie = (newMovieData) => {
  tagify.addTags(newMovieData.suggestedTags);
  gifIFrameContainer.setAttribute("src", newMovieData.gif);
  movieTitleContainer.innerHTML = newMovieData.title;
};

btnSave.addEventListener("click", () => {
  saveCurrentMovie(movies[i]);
  if (i >= movies.length - 1) {
    movieTitleContainer.innerHTML = "";
    gifIFrameContainer.parentNode.removeChild(gifIFrameContainer);
    btnSave.setAttribute("disabled", "");
    tagify.setDisabled(true);
    return;
  }
  loadMovie(movies[++i]);
});

loadMovie(movies[i]);
