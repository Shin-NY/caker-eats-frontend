describe("myRestaurant", () => {
  it("should show create restaurant button", () => {
    cy.login("owner@gmail.com", "1234");
    cy.intercept(
      { method: "POST", url: "http://localhost:4000/graphql" },
      req => {
        switch (req.body?.operationName) {
          case "seeMe":
            return req.reply({
              data: {
                seeMe: {
                  ok: true,
                  error: null,
                  result: {
                    id: 1,
                    role: "Owner",
                    verified: true,
                    restaurantId: null,
                  },
                },
              },
            });
        }
      }
    );
    cy.visit("/");
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
    cy.findByText("You don't have a restaurant");
    cy.findByTestId("create-restaurant-btn").click();
    cy.url({ timeout: 10000 }).should("contain", "/create-restaurant");
  });

  it("should show my restaurant", () => {
    cy.login("owner@gmail.com", "1234");
    cy.visit("/");
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
    cy.findByAltText("restaurant cover");
    cy.findAllByAltText("dish cover");
    cy.findByText("New dish").click();
    cy.url({ timeout: 10000 }).should("contain", "/create-dish");
  });
});
