// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("enterText", (selector, text) => {
  cy.get(selector).type(text);
});

Cypress.Commands.add("pressClick", (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add("checkUrl", (endpoint) => {
  cy.url().should("include", endpoint);
});

// Cypress.Commands.add("changePassword", (newPassword) => {
//   cy.pressClick(registrationElements.account);
//   cy.enterText(".layout-column-start > :nth-child(1) > .frm", newPassword);
//   cy.enterText(
//     ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm",
//     newPassword
//   );
//   cy.pressClick(".layout-row-end > .btn-service");
// });
