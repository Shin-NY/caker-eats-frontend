describe("search", () => {
  const key = "cake";
  it("should show search result", () => {
    cy.visit(`/search/${key}`);
    cy.url({ timeout: 10000 }).should("contain", `/search/${key}`);
    cy.findAllByAltText("restaurant cover");
    cy.findAllByRole("gridcell").first().click();
    cy.url({ timeout: 10000 }).should("contain", "/restaurants/");
  });
});
