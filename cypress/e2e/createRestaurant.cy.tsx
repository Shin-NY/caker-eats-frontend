describe("createRestaurant", () => {
  it("should show form error", () => {
    cy.login("owner@gmail.com", "1234");
    cy.intercept("POST", "http://localhost:4000/graphql", req => {
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
        case "CreateRestaurant":
          return req.reply({
            data: {
              createRestaurant: {
                ok: false,
                restaurantId: null,
                error: "create error",
                __typename: "CreateRestaurantOutput",
              },
            },
          });
      }
    });
    cy.visit("/create-restaurant");
    cy.url({ timeout: 10000 }).should("contain", "/create-restaurant");
    cy.findByTestId("create-restaurant-btn").click();
    cy.findByText("Name is required");
    cy.findByPlaceholderText("Restaurant name").type("restaurant name");
    cy.findByTestId("create-restaurant-btn").click();
    cy.findByText("create error");
  });

  it("should create restaurant", () => {
    cy.login("owner@gmail.com", "1234");
    cy.intercept("POST", "http://localhost:4000/graphql", req => {
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
        case "CreateRestaurant":
          return req.reply({
            data: {
              createRestaurant: {
                ok: true,
                restaurantId: 1,
                error: null,
                __typename: "CreateRestaurantOutput",
              },
            },
          });
      }
    });
    cy.visit("/create-restaurant");
    cy.url({ timeout: 10000 }).should("contain", "/create-restaurant");
    cy.findByPlaceholderText("Restaurant name").type("restaurant name");
    cy.findByTestId("create-restaurant-btn").click();
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });
});
