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
		const data = await response.json();
		if (data.error) {
			throw new Error(data.error);
		}
		return data;
	}

	async getMovies() {
		const data = await this.performRequest("GET", "/");

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
