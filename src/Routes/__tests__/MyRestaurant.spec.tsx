import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserRole } from "../../generated/graphql";
import { SeeMeQueryDoc } from "../../hooks/useMe";
import MyRestaurant, { SeeRestaurantDoc } from "../MyRestaurant";
import "@testing-library/jest-dom/extend-expect";

describe("<MyRestaurant />", () => {
  const owner = {
    id: 1,
    role: UserRole.Owner,
    verified: true,
    restaurantId: 1,
  };
  const restaurant = {
    id: owner.restaurantId,
    name: "restaurant name",
    imageUrl: "restaurant image",
    menu: [
      {
        id: 2,
        name: "dish name",
        description: "dish description",
        imageUrl: "dish image",
        price: 10,
        options: [
          {
            name: "option name",
            extra: 5,
          },
        ],
      },
    ],
  };
  it("should show my restaurant", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SeeMeQueryDoc,
            },
            result: {
              data: {
                seeMe: {
                  ok: true,
                  error: null,
                  result: owner,
                },
              },
            },
          },
          {
            request: {
              query: SeeRestaurantDoc,
              variables: { input: { restaurantId: owner.restaurantId } },
            },
            result: {
              data: {
                seeRestaurant: {
                  ok: true,
                  error: null,
                  result: restaurant,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <MyRestaurant />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(await screen.findByAltText("restaurant cover")).toHaveAttribute(
      "src",
      restaurant.imageUrl
    );
    screen.getByText(restaurant.name);
    expect(screen.getByAltText("dish cover")).toHaveAttribute(
      "src",
      restaurant.menu[0].imageUrl
    );
    screen.getByText(restaurant.menu[0].name);
    screen.getByText("$" + restaurant.menu[0].price);
    screen.getByText("+$" + restaurant.menu[0].options[0].extra);
    screen.getByText(restaurant.menu[0].options[0].name);
  });
});
