export class RegistrationPage {
  elements = {
    nameField: () => cy.get(":nth-child(3) > .frm"),
    emailField: () => cy.get(":nth-child(4) > .frm"),
    registrationButton: () => cy.get(".btn-main"),
  };

  registration(name, email) {
    this.elements.nameField().type(name);
    this.elements.emailField().type(email);
    this.elements.registrationButton().click();
  }
}
