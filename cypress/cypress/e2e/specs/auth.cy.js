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
});
