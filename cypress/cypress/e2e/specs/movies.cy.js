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
    cy.wait("@requestAllMovies");
    cy.get('[data-cy-movie-id="Star Wars"] [data-cy="star-btn-2"]').click();
    cy.wait("@requestScoreMovie");
    cy.wait("@requestAllMovies");
    cy.get('[data-cy-movie-id="Star Wars"] [data-cy="star-btn-2"]').should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
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
    cy.get('[data-cy="star-btn-4"]').click();
    cy.get('[data-cy="create-movie-btn"]').click();
    cy.wait("@requestAddNewMovie");
    cy.location("pathname").should("eq", "/");
    cy.contains("Matrix");
    cy.get('[data-cy="movie-card"]').should("have.length", 3);
  });
  it("should delete Star Wars movie", () => {
    cy.intercept("DELETE", "/api/*").as("requestDeleteMovie");
    cy.signIn();
    cy.get(
      '[data-cy-movie-id="Star Wars"] [data-cy="delete-movie-btn"]'
    ).click();
    cy.wait("@requestDeleteMovie");
    cy.get("[data-cy-movie-id='Star Wars']").should("not.exist");
    cy.get('[data-cy="movie-card"]').should("have.length", 1);
  });
});
