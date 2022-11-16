import { getToken } from "./setupLogin";

export const setupPerformRequest = (element, onGetMoviesCb) => {
  element.addEventListener("click", async () => {
    try {
      const response = await fetch("./api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      if (typeof onGetMoviesCb === "function") {
        onGetMoviesCb(data);
      }
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
      const response = await fetch(`./api/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      if (typeof onDeleteMovieCb === "function") {
        onDeleteMovieCb();
      }
    } catch (err) {
      console.log(err);
    }
  });
};
