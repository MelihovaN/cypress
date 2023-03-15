const registrationElements = require("../fixtures/pages/registrationSelectors.json");
import { LoginPage } from "../pages/loginPage";

describe("santa login - UI", () => {
  let loginPage = new LoginPage();
  beforeEach("visit and login", () => {
    cy.visit("/");
    cy.pressClick(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    );
    loginPage.login(Cypress.env("email"), Cypress.env("password"));
    cy.contains("Уведомления").should("exist");
  });

  it("user can change the password", () => {
    let newPassword = "Test12345";
    //cy.changePassword(newPassword);
    cy.pressClick(registrationElements.account);
    cy.enterText(".layout-column-start > :nth-child(1) > .frm", newPassword);
    cy.enterText(
      ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm",
      newPassword
    );
    cy.pressClick(".layout-row-end > .btn-service");
    cy.contains("Выйти с сайта").click();

    //User can not login with old password"
    cy.pressClick(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    );
    loginPage.login(Cypress.env("email"), Cypress.env("password"));
    cy.contains("Неверное имя пользователя или пароль").should("exist");

    // login with new password
    cy.get(registrationElements.emailField).clear().type(newPassword);
    cy.get(registrationElements.registrationButton).click();

    //Change to the old password
    cy.pressClick(registrationElements.account);
    cy.enterText(
      ".layout-column-start > :nth-child(1) > .frm",
      Cypress.env("password")
    );
    cy.enterText(
      ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm",
      Cypress.env("password")
    );
    cy.pressClick(".layout-row-end > .btn-service");
  });
});
