describe("createDish", () => {
  it("should show form error", () => {
    cy.login("owner@gmail.com", "1234");
    cy.findByText("New dish").click();
    cy.url({ timeout: 10000 }).should("contain", "/create-dish");
    cy.findByTestId("create-dish-button").click();
    cy.findByText("Name is required");
    cy.findByText("Price is required");
    cy.findByPlaceholderText("dish name").type("dish name");
    cy.findByPlaceholderText("$ price").type("10");
    cy.findByPlaceholderText("description").type("description");
    cy.findByText("Add option").click();
    cy.findByPlaceholderText("option name").type("option name");
    cy.findByPlaceholderText("$ extra").clear().type("5");
    cy.intercept(
      { method: "POST", url: "http://localhost:4000/graphql" },
      req => {
        switch (req.body?.operationName) {
          case "CreateDish":
            return req.reply({
              data: {
                createDish: {
                  ok: false,
                  error: "create error",
                  dishId: null,
                },
              },
            });
        }
      }
    );
    cy.findByTestId("create-dish-button").click();
    cy.findByText("create error");
  });

  it("should create new dish", () => {
    cy.login("owner@gmail.com", "1234");
    cy.findByText("New dish").click();
    cy.url({ timeout: 10000 }).should("contain", "/create-dish");
    cy.findByPlaceholderText("dish name").type("dish name");
    cy.findByPlaceholderText("$ price").type("10");
    cy.findByPlaceholderText("description").type("description");
    cy.findByText("Add option").click();
    cy.findByPlaceholderText("option name").type("option name");
    cy.findByPlaceholderText("$ extra").clear().type("5");
    cy.intercept(
      { method: "POST", url: "http://localhost:4000/graphql" },
      req => {
        switch (req.body?.operationName) {
          case "CreateDish":
            return req.reply({
              data: {
                createDish: {
                  ok: true,
                  error: null,
                  dishId: 1,
                },
              },
            });
        }
      }
    );
    cy.findByTestId("create-dish-button").click();
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });
});
