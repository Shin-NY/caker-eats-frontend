describe("signup", () => {
  it("should show form error", () => {
    cy.visit("/signup");
    cy.get(".button").click();
    cy.contains("Email is required");
    cy.contains("Password is required");
    cy.contains("Password Confirm is required");
    cy.get('[name="email"]').type("invalid@email");
    cy.contains("Invalid email format");

    cy.get('[name="email"]').clear().type("customer@gmail.com");
    cy.get('[name="password"]').type("1234");
    cy.get('[name="passwordConfirm"]').type("12345");
    cy.get(".button").click();
    cy.contains("Password not matching");
    cy.get('[name="passwordConfirm"]').clear().type("1234");
    cy.get(".button").click();
    cy.contains("Email already exists.");
  });

  it("should signup", () => {
    cy.intercept(
      { method: "POST", url: "http://localhost:4000/graphql" },
      { fixture: "signup.json" }
    );
    cy.visit("/signup");
    cy.get('[name="email"]').type("customer@gmail.com");
    cy.get('[name="password"]').type("1234");
    cy.get('[name="passwordConfirm"]').type("1234");
    cy.get(".button").click();
    cy.url().should("include", "/login");
  });
});
