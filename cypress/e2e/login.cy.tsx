describe("login", () => {
  it("should show form error", () => {
    cy.visit("/login");
    cy.get(".button").click();
    cy.contains("Email is required");
    cy.contains("Password is required");
    cy.get('[name="email"]').type("invalid@email");
    cy.contains("Invalid email format");

    cy.get('[name="email"]').clear().type("nouser@email.com");
    cy.get('[name="password"]').type("1234");
    cy.get(".button").click();
    cy.contains("User not found.");
  });
  it("should login", () => {
    cy.visit("/login");
    cy.get(".button").click();
    cy.get('[name="email"]').type("customer@gmail.com");
    cy.get('[name="password"]').type("1234");
    cy.get(".button").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
