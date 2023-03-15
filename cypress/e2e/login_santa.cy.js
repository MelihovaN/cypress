import { faker } from "@faker-js/faker";
const registrationElements = require("../fixtures/pages/registrationSelectors.json");

describe("Login page tests", () => {
  beforeEach("login", () => {
    //sign in to the account
    cy.visit("/");
    cy.pressClick(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    );
  });
  it("Invalid email and password", () => {
    cy.get(registrationElements.nameField).type("melihovagmail.com");
    cy.get(registrationElements.emailField).type(".");
    cy.get(registrationElements.registrationButton).click();
    cy.get(".frm-wrapper__top__error").contains("Некорректный email");
    cy.get(".hint > .txt-secondary").contains("В форме допущены ошибки");
  });
  it("Unregistered user data", () => {
    let fakeEmail = faker.internet.email();
    let fakePassword = faker.internet.password();
    cy.get(registrationElements.nameField).type(fakeEmail);
    cy.get(registrationElements.emailField).type(fakePassword);
    cy.get(registrationElements.registrationButton).click();
    cy.get(".hint > .txt-secondary").contains(
      "Мы не нашли пользователя с таким email"
    );
  });
  it("Blank fields", () => {
    cy.get(registrationElements.registrationButton).click();
    cy.get(
      ":nth-child(3) > .frm-wrapper__top > .frm-wrapper__top__error"
    ).contains("Обязательное поле");
    cy.get(".hint > .txt-secondary").contains("В форме допущены ошибки");
  });

  it("Valid email and password", () => {
    cy.enterText(registrationElements.nameField, Cypress.env("email"));
    cy.enterText(registrationElements.emailField, Cypress.env("password"));
    cy.pressClick(registrationElements.registrationButton);
    cy.contains("Уведомления").should("exist");
  });
});
