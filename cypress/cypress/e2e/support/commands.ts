/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("signIn", () => {
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
