describe("orderDetail", () => {
  it("should show order detail", () => {
    cy.login("owner@gmail.com", "1234");
    cy.visit("/orders");
    cy.findAllByRole("listitem").first().click();
    cy.url({ timeout: 10000 }).should("contain", "/orders/");
    cy.findByText("Restaurant");
    cy.findByText("Customer");
    cy.findByText("Driver");
    cy.findByText("Dishes");
    cy.findByText("Location");
  });
});
