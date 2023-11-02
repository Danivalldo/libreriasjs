/// <reference types="Cypress" />

describe("SignUp", () => {
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
  });
});
