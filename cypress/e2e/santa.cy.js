describe("secret santa testing", () => {
  beforeEach("passes", () => {
    cy.visit("https://santa-secret.ru/");
  });

  it("open the site", () => {
    cy.get("#root").should("have.length", 1);
  });
});
