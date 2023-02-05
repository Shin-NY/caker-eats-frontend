describe("orderDetail", () => {
  const order = {
    id: 1,
    createdAt: "createdAt",
    dishes: [
      {
        dishId: 1,
        count: 1,
        options: [
          {
            name: "option name",
          },
        ],
      },
    ],
    location: "location",
    customer: {
      id: 1,
      email: "customer@gmail.com",
    },
    restaurant: {
      id: 1,
      name: "restaurant name",
      menu: [
        {
          id: 1,
          name: "dish name",
        },
      ],
      imageUrl: "imageUrl",
    },
    driver: {
      id: 1,
      email: "driver@gmail.com",
    },
    status: "Pending",
  };
  it("should show order detail", () => {
    cy.login("owner@gmail.com", "1234");
    cy.intercept("POST", "http://localhost:4000/graphql", req => {
      switch (req.body?.operationName) {
        case "seeMe":
          req.reply({
            data: {
              seeMe: {
                ok: true,
                error: null,
                result: {
                  id: 1,
                  role: "Owner",
                  verified: true,
                  restaurantId: 1,
                },
              },
            },
          });
          break;
        case "SeeOrder":
          req.reply({
            data: {
              seeOrder: {
                ok: true,
                error: null,
                result: order,
                __typename: "SeeOrderOutput",
              },
            },
          });
          break;
      }
    });
    cy.visit("/orders/1");
    cy.url({ timeout: 10000 }).should("contain", "/orders/1");
    cy.findByText(order.restaurant.name);
    cy.findByText(order.customer.email);
    cy.findByText(order.driver.email);
    cy.findByText(order.restaurant.menu[0].name);
    cy.findByText(order.dishes[0].count);
    cy.findByText("+" + order.dishes[0].options[0].name);
    cy.findByText(order.location);
  });

  it("should change order status", () => {
    cy.login("owner@gmail.com", "1234");
    cy.intercept("POST", "http://localhost:4000/graphql", req => {
      switch (req.body?.operationName) {
        case "seeMe":
          req.reply({
            data: {
              seeMe: {
                ok: true,
                error: null,
                result: {
                  id: 1,
                  role: "Owner",
                  verified: true,
                  restaurantId: 1,
                },
              },
            },
          });
          break;
        case "SeeOrder":
          req.reply({
            data: {
              seeOrder: {
                ok: true,
                error: null,
                result: order,
                __typename: "SeeOrderOutput",
              },
            },
          });
          break;
      }
    });
    cy.visit("/orders/1");
    cy.url({ timeout: 10000 }).should("contain", "/orders/1");
    cy.findByText(order.status).trigger("mouseover");
    cy.findByText("Change to Cooking").trigger("mouseout");
    cy.findByText(order.status);
  });
});
