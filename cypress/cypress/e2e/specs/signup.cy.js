/// <reference types="Cypress" />

describe("SignUp", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should create a new user and login", async () => {
    cy.fixture("userTestCredenitals").as("userCredentials");
    cy.intercept("POST", "/signup").as("requestSignUp");
    cy.intercept("POST", "/signin").as("requestSignIn");
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.get('[data-cy="go-to-signup-btn"]').click();
    cy.location("pathname").should("eq", "/sign-up");
    cy.get('[name="username"]').click();
    cy.get("@userCredentials").then((userCredentials) => {
      cy.get('[name="username"]').type(userCredentials.email);
      cy.get('[name="password"]').type(userCredentials.password);
      cy.get('[name="repeated-password"]').type(userCredentials.password);
    });
    cy.get('[data-cy="register-btn"]').click();
    cy.wait("@requestSignUp")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.location("pathname").should("eq", "/login");
    cy.getAllLocalStorage().should("be.empty");
    cy.get("@userCredentials").then((userCredentials) => {
      cy.get('input[name="username"]').click();
      cy.get('input[name="username"]').type(userCredentials.email);
      cy.get('input[name="password"]').click();
      cy.get('input[name="password"]').type(userCredentials.password);
    });
    cy.get('button[type="submit"]').click();
    cy.wait("@requestSignIn")
      .its("response")
      .its("statusCode")
      .should("eq", 200);
    cy.location("pathname").should("eq", "/");
    cy.getAllLocalStorage()
      .its(`http://localhost:${Cypress.env("PORT")}`)
      .its("CY_MY_MOVIES_TOKEN")
      .should("not.be.undefined");
    cy.get('[data-cy="movie-card"]').should("have.length", 0);
  });
});
