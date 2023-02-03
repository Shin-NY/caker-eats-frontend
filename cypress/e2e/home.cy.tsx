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
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
    cy.findAllByPlaceholderText("Search restaurants...")
      .last()
      .type("cake{enter}");
    cy.url({ timeout: 10000 }).should("contain", "/search/cake");
    cy.findAllByRole("gridcell");
  });
  it("should go to restaurant detail", () => {
    cy.visit("/");
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
    cy.findAllByRole("gridcell").first().click();
    cy.url({ timeout: 10000 }).should("contain", "/restaurants/");
    cy.findByAltText("restaurant cover");
  });
});
