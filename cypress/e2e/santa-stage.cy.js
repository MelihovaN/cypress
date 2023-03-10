describe("Secret Sanat Suit Case", () => {
  beforeEach("login", () => {
    //sign in to the account
    cy.visit("/");
    cy.pressClick(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    );
    //cy.get(
    //   ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    // ).click();
    cy.enterText(":nth-child(3) > .frm", Cypress.env("email"));
    cy.enterText(":nth-child(4) > .frm", Cypress.env("password"));
    //cy.get(":nth-child(3) > .frm").type(Cypress.env("email"));
    //cy.get(":nth-child(4) > .frm").type(Cypress.env("password"));
    cy.pressClick(".btn-main");
    //cy.get(".btn-main").click();
  });

  it("test the link - boxes", () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    )
      .should("be.visible")
      .click();
    cy.checkUrl("account/boxes");
    //cy.url().should("include", "account/boxes");
  });

  it("test the link - creat a box", () => {
    cy.pressClick('.home-page-buttons > [href="/box/new"] > .btn-main');
    //cy.get('.home-page-buttons > [href="/box/new"] > .btn-main').click();
    cy.checkUrl("box/new");
    //cy.url().should("include", "box/new");
  });

  it("test the link - quick draw", () => {
    cy.pressClick('[href="/randomizer"] > .btn-secondary');
    //cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.checkUrl("randomizer");
    //cy.url().should("include", "randomizer");
  });

  it("test the link - account settings", () => {
    cy.pressClick(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med'
    );
    // cy.get(
    //   '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med'
    // ).click();
    cy.checkUrl("account");
    //cy.url().should("include", "account");
  });
});
