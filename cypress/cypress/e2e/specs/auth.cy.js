/// <reference types="Cypress" />

describe("Auth", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should signin", () => {
    cy.signIn();
  });
  it("should signout", () => {
    cy.signIn();
    cy.get('[data-cy="signout-btn"]').click();
    cy.location("pathname").should("eq", "/login");
    cy.getAllLocalStorage().should("be.empty");
  });
  it("should redirect after session expired", () => {
    cy.signIn();
    cy.location("pathname").should("eq", "/");
    //Sessions expired after 30min so we need to move time and stub backend response
    cy.clock();
    cy.tick(1000 * 60 * 60 * 1.5);
    cy.intercept("/api/*", {
      statusCode: 401,
      body: { error: "Unauthorized" },
    }).as("apiRequest");
    cy.get('[data-cy-movie-id="Star Wars"] [data-cy="star-btn-2"]').click();
    cy.wait("@apiRequest");
    cy.location("pathname").should("eq", "/login");
    cy.contains("Your session expired");
  });
  it("should detect if user does not exists", () => {
    cy.visit("/");
    cy.get(["[]"]);
    cy.location("pathname").should("eq", "/login");
    cy.getAllLocalStorage().should("be.empty");
    cy.get('input[name="username"]').click();
    cy.get('input[name="username"]').type("no-user@test.com");
    cy.get('input[name="password"]').click();
    cy.get('input[name="password"]').type("no-user-pass");
    cy.get('button[type="submit"]').click();
    cy.contains("This user does not exists");
    cy.location("pathname").should("eq", "/login");
  });
});
