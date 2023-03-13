import { faker } from "@faker-js/faker";
//import { contains } from "cypress/types/jquery";
import { RegistrationPage } from "../pages/registrationPage";
const registrationElements = require("../fixtures/pages/registrationSelectors.json");

describe("Secret Sanat registration tests", () => {
  beforeEach("visit", () => {
    cy.visit("/");
    cy.pressClick(
      ".layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med"
    );
    cy.pressClick(".form-auth__header__subtitle > a > .txt-secondary--med");
    cy.contains("Ваше имя").should("exist");
    cy.contains("Ваш email").should("exist");
  });

  let newEmail = faker.internet.email();
  let newName = faker.name.firstName();

  it("valid email and name", () => {
    let registrationPage = new RegistrationPage();

    registrationPage.registration("Natalia", "melihova.qa+1@gmail.com");
    cy.get(".picture-notice__title")
      .contains("Письмо отправлено!")
      .and("have.class", "picture-notice__title txt-h3--semi txt");
  });
  it("Existed user and invalid data", () => {
    //Existind user
    cy.get(registrationElements.nameField).clear().type("Natalia");
    cy.get(registrationElements.emailField)
      .clear()
      .type("melihova.qa+1@gmail.com");
    cy.get(registrationElements.registrationButton).click();
    cy.get(".form-auth__error > .hint > .txt-secondary")
      .contains("Такой пользователь уже зарегистрирован")
      .and("have.class", "txt-secondary txt txt--red");

    //Name-one caracter, email-Capital letter
    cy.get(registrationElements.nameField)
      .clear()
      .type("F")
      .should("be.visible");
    cy.get(registrationElements.emailField)
      .clear()
      .type(newEmail)
      .should("be.visible");
    cy.get(registrationElements.registrationButton).click();
    cy.get(".frm-wrapper__top__error").contains(
      "Имя должно быть более 2 символов"
    );
    cy.get(".form-auth__error > .hint > .txt-secondary").contains(
      "Некорректное поле"
    );
    //name-random, email-invalid
    cy.get(registrationElements.nameField).clear().type(newName);
    cy.get(registrationElements.emailField).clear().type("melihova.com");
    cy.get(registrationElements.registrationButton).click();
    cy.get(".frm-wrapper__top__error")
      .contains("Некорректный email")
      .and("have.class", "frm-wrapper__top__error");

    //name-blank, email-blank
    cy.get(registrationElements.nameField).clear();
    cy.get(registrationElements.emailField).clear();
    cy.get(registrationElements.registrationButton).click();
    cy.get(
      ":nth-child(3) > .frm-wrapper__top > .frm-wrapper__top__error"
    ).contains("Обязательное поле");
    cy.get(
      ":nth-child(4) > .frm-wrapper__top > .frm-wrapper__top__error"
    ).contains("Обязательное поле");
  });
  it("Delite user", () => {
    cy.get(".form-auth__header__subtitle > a > .txt-secondary--med").click();
    cy.get(registrationElements.nameField)
      .clear()
      .type("melihova.qa+1@gmail.com");
    cy.get(registrationElements.emailField).type("KD9065");
    cy.get(registrationElements.registrationButton).click();
    cy.pressClick(registrationElements.account);
    cy.get(
      ":nth-child(5) > .form-page-group__main > .layout-column-start > .frm-wrapper > .frm"
    ).type("Удалить профиль");
    cy.pressClick(
      ":nth-child(3) > .layout-column-start > .layout-row-end > .btn-service"
    );
  });
});

//cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med')
