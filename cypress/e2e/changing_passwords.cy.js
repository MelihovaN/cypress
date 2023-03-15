const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");
const accountElements = require("../fixtures/pages/accountPageSelectors.json");
import { LoginPage } from "../pages/loginPage";

describe("santa login - UI", () => {
  let loginPage = new LoginPage();
  beforeEach("visit and login", () => {
    cy.visit("/");
    cy.pressClick(loginPageElements.loginLink);
    loginPage.login(Cypress.env("email"), Cypress.env("password"));
    cy.contains("Уведомления").should("exist");
  });

  it("user can change the password", () => {
    let newPassword = "Test12345";
    //cy.changePassword(newPassword);
    cy.pressClick(loginPageElements.account);
    cy.enterText(accountElements.passwordField1, newPassword);
    cy.enterText(accountElements.passwordField2, newPassword);
    cy.pressClick(accountElements.savePassword);
    cy.contains("Выйти с сайта").click();

    //User can not login with old password"
    cy.pressClick(loginPageElements.loginLink);
    loginPage.login(Cypress.env("email"), Cypress.env("password"));
    cy.contains("Неверное имя пользователя или пароль").should("exist");

    // login with new password
    cy.get(loginPageElements.passwordField).clear().type(newPassword);
    cy.get(loginPageElements.loginButton).click();

    //Change to the old password
    cy.pressClick(loginPageElements.account);
    cy.enterText(accountElements.passwordField1, Cypress.env("password"));
    cy.enterText(accountElements.passwordField2, Cypress.env("password"));
    cy.pressClick(accountElements.savePassword);
  });
});
