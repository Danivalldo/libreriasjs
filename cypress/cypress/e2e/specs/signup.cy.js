/// <reference types="Cypress" />

describe("SignUp", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should create a new user and login", () => {
    cy.intercept("POST", "/signup").as("requestSignUp");
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.get('[data-cy="go-to-signup-btn"]').click();
    cy.location("pathname").should("eq", "/sign-up");
    cy.get('[name="username"]').click();
    cy.get('[name="username"]').type("test2@test.com");
    cy.get('[name="password"]').type("A@1poiuytrewq");
    cy.get('[name="repeated-password"]').type("A@1poiuytrewq");
    cy.get('[data-cy="register-btn"]').click();
    cy.wait("@requestSignUp");
    cy.location("pathname").should("eq", "/login");
    cy.intercept("POST", "/signin").as("requestSignIn");
    cy.getAllLocalStorage().should("be.empty");
    cy.get('input[name="username"]').click();
    cy.get('input[name="username"]').type("test2@test.com");
    cy.get('input[name="password"]').click();
    cy.get('input[name="password"]').type("A@1poiuytrewq");
    cy.get('button[type="submit"]').click();
    cy.wait("@requestSignIn");
    cy.location("pathname").should("eq", "/");
    cy.getAllLocalStorage()
      .its(`http://localhost:5174`)
      .its("CY_MY_MOVIES_TOKEN")
      .should("not.be.undefined");
    cy.get('[data-cy="movie-card"]').should("have.length", 0);
  });
});
