/// <reference types="Cypress" />

describe("Movies", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should get movies", () => {
    cy.signIn();
    cy.get('[data-cy="movie-card"]').should("have.length", 2);
  });
  it("should rate Star Wars movie to 2", () => {
    cy.intercept("PUT", "/api/*").as("requestScoreMovie");
    cy.intercept("GET", "/api").as("requestAllMovies");
    cy.signIn();
    cy.wait("@requestAllMovies")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.get('[data-cy-movie-id="Star Wars"] [data-cy="star-btn-2"]').click();
    cy.wait("@requestScoreMovie")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.wait("@requestAllMovies")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.get('[data-cy-movie-id="Star Wars"] [data-cy="star-btn-2"]').should(
      "have.css",
      "color",
      "rgb(255, 238, 0)"
    );
    cy.get('[data-cy-movie-id="Star Wars"] [data-cy="star-btn-3"]')
      .should("have.css", "color")
      .and("not.match", /rgb\(255, 0, 0\)/);
  });
  it("should create a new movie with name Matrix with 4 stars", () => {
    cy.intercept("POST", "/api").as("requestAddNewMovie");
    cy.signIn();
    cy.get('[data-cy="add-movie-btn"]').click();
    cy.location("pathname").should("eq", "/add-movie");
    cy.get('input[name="movieName"]').click();
    cy.get('input[name="movieName"]').type("Matrix");
    cy.get('input[name="poster"]').click();
    cy.get('input[name="poster"]').type("./matrix.jpeg");
    cy.get('[data-cy="star-btn-4"]').click();
    cy.get('[data-cy="create-movie-btn"]').click();
    cy.wait("@requestAddNewMovie")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.location("pathname").should("eq", "/");
    cy.contains("Matrix");
    cy.get('[data-cy-movie-id="Matrix"]')
      .find("img")
      .should("have.attr", "src")
      .should("include", "matrix.jpeg");
    cy.get('[data-cy="movie-card"]').should("have.length", 3);
  });
  it("should delete Star Wars movie", () => {
    cy.intercept("DELETE", "/api/*").as("requestDeleteMovie");
    cy.signIn();
    cy.get(
      '[data-cy-movie-id="Star Wars"] [data-cy="delete-movie-btn"]'
    ).click();
    cy.wait("@requestDeleteMovie")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.get("[data-cy-movie-id='Star Wars']").should("not.exist");
    cy.get('[data-cy="movie-card"]').should("have.length", 1);
  });
});
