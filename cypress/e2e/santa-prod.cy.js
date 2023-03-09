// const {
//   extends: "./cypress.config.js",
//   baseUrl: "https://santa-secret.ru/"
// } = require("/prod-config.js");

describe("secret santa testing", () => {
  beforeEach("login", () => {
    // let url = Cypress.config().baseUrl;
    cy.visit("/");
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    ).click();
    cy.get(":nth-child(3) > .frm").type(Cypress.env("email"));
    cy.get(":nth-child(4) > .frm").type(Cypress.env("password"));
    cy.get(".btn-main").click();
  });
  it("test the link - boxes", () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    )
      .should("be.visible")
      .click();
    cy.url().should("include", "account/boxes");
  });
});
