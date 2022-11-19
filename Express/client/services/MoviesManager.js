import loginManager from "./LoginManager";

class MoviesManager {
  constructor() {
    this.endpoint = "./api";
  }

  async performRequest(method = "GET", endpoint = "", body) {
    const response = await fetch(`${this.endpoint}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: loginManager.getToken(),
      },
      body,
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response;
  }

  async getMovies() {
    const response = await this.performRequest("GET", "/");
    const data = await response.json();
    return data;
  }

  async deleteMovie(id) {
    await this.performRequest("DELETE", `/${id}`);
  }

  async addMovie(movie) {
    await this.performRequest("POST", "/", JSON.stringify(movie));
  }

  async updateMovie(id, movie) {
    await this.performRequest("PUT", `/${id}`, JSON.stringify(movie));
  }
}

const moviesManager = new MoviesManager();

export default moviesManager;
