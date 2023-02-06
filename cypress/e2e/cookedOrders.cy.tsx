describe("cookedOrders", () => {
  it("should show cooked orders", () => {
    cy.login("driver@gmail.com", "1234");
    cy.visit("/");
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
    cy.findAllByRole("listitem").first().as("cookedOrder");
    cy.get("@cookedOrder").findByText(/restaurant:/);
    cy.get("@cookedOrder").findByText(/to:/);
    cy.get("@cookedOrder").findByText("Pickup");
    cy.intercept(
      { method: "POST", url: "http://localhost:4000/graphql", times: 1 },
      {
        fixture: "pickupOrder.json",
      }
    );
    cy.get("@cookedOrder").findByText("Pickup").click();
    cy.url({ timeout: 10000 }).should("contain", "/orders/1");
  });
});
