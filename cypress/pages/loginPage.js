export class LoginPage {
  elements = {
    emailField: () => cy.get(":nth-child(3) > .frm"),
    passwordField: () => cy.get(":nth-child(4) > .frm"),
    loginButton: () => cy.get(".btn-main"),
  };

  login(email, password) {
    this.elements.emailField().type(email);
    this.elements.passwordField().type(password);
    this.elements.loginButton().click();
  }
}
