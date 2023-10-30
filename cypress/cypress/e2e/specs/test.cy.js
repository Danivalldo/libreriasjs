/// <reference types="Cypress" />

describe("test", () => {
  it("should see Home", () => {
    cy.visit("/");
    cy.contains("HOME");
  });
  it("should see login", () => {
    cy.visit("/login");
    cy.contains("Login");
  });
  it("should see 404", () => {
    cy.visit("/sadasdasdasd");
    cy.contains("Error 404");
    cy.get("a").click();
    cy.contains("HOME");
  });
});
