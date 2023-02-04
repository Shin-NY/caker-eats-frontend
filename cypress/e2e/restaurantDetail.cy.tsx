describe("restaurantDetail", () => {
  it("should order dish", () => {
    cy.login("customer@gmail.com", "1234");
    cy.visit("/restaurants/12");
    cy.url({ timeout: 10000 }).should("contain", "/restaurants/12");
    cy.findAllByAltText("dish cover");
    cy.findAllByTestId("dish-option-checkbox").first().click();
    cy.findAllByTestId("dish-button").first().click();
    cy.findByTestId("order-dish");
    cy.intercept(
      { method: "POST", url: "http://localhost:4000/graphql", times: 1 },
      { fixture: "createOrder.json" }
    );
    cy.findByTestId("order-button").click();
    cy.url({ timeout: 10000 }).should("contain", "/orders/1");
  });
});
