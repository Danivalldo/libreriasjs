/// <reference types="Cypress" />

describe("Security", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should avoid XSS attack", () => {
    cy.intercept("POST", "/api").as("requestAddNewMovie");
    cy.signIn();
    cy.get('[data-cy="add-movie-btn"]').click();
    cy.location("pathname").should("eq", "/add-movie");
    cy.get('input[name="movieName"]').click();
    cy.get('input[name="movieName"]').type(
      "<script>console.log('XSS injected via movieName input')</script>"
    );
    cy.get('input[name="poster"]').click();
    cy.get('input[name="poster"]').type("<h1>Inject HTML code</h1>");
    cy.get('[data-cy="create-movie-btn"]').click();
    cy.wait("@requestAddNewMovie")
      .its("response")
      .its("statusCode")
      .should("eq", 500);
    cy.visit("/");
    cy.get('[data-cy="movie-card"]').should("have.length", 2);
  });
});
