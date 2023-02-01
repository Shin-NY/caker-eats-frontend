describe("home", () => {
  it("should show home", () => {
    cy.visit("/");
    cy.contains("Caker");
    cy.contains("Eats");
    cy.findByPlaceholderText("Search restaurants...");
    cy.contains("Log in");
    cy.contains("Sign up");
    cy.findAllByRole("group");
    cy.findAllByRole("gridcell");
  });
  it("should show restaurants of category", () => {
    cy.visit("/");
    cy.findAllByRole("group").first().click();
    cy.findAllByRole("gridcell");
  });
  it("should search restaurants", () => {
    cy.visit("/");
    cy.findByPlaceholderText("Search restaurants...").type("cake{enter}");
    cy.url().should("contain", "/search/cake");
    cy.findAllByRole("gridcell");
  });
});
