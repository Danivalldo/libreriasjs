/// <reference types="Cypress" />

describe("Auth", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should signin", () => {
    cy.intercept("POST", "/signin").as("requestSignIn");
    cy.getAllLocalStorage().should("be.empty");
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
    cy.get('input[name="username"]').click();
    cy.get('input[name="username"]').type("test@test.com");
    cy.get('input[name="password"]').click();
    cy.get('input[name="password"]').type("1A@qwertyuiop");
    cy.get('button[type="submit"]').click();
    cy.wait("@requestSignIn");
    cy.location("pathname").should("eq", "/");
    cy.getAllLocalStorage()
      .its(`http://localhost:5174`)
      .its("CY_MY_MOVIES_TOKEN")
      .should("not.be.undefined");
  });
  // it('should signout', ()=>{
  //   cy.intercept('POST', '/signout').as('requestSignOut');
  // })
});
