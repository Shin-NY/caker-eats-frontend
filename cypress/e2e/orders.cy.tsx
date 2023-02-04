describe("orders", () => {
  it("should show orders", () => {
    cy.login("customer@gmail.com", "1234");
    cy.findByText("My orders").click();
    cy.url({ timeout: 10000 }).should("contain", "/orders");
    cy.findAllByText(/restaurant: /);
    cy.findAllByText(/to: /);
    cy.findAllByRole("listitem").first().click();
    cy.url({ timeout: 10000 }).should("contain", "/orders/");
  });
});
