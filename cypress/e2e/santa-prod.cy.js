const {
  extends: "./cypress.config.js",
  baseUrl: "https://santa-secret.ru/"
} = require("/prod-config.js");

describe("secret santa testing", () => {
  beforeEach("passes", () => {
    let url = Cypress.config().baseUrl;
    cy.visit(url);
  });

  it("open the site", () => {
    cy.get("#root").should("have.length", 1);
  });
});
