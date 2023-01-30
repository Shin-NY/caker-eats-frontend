import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserRole } from "../../generated/graphql";
import { SeeMeQueryDoc } from "../../hooks/useMe";
import RestaurantDetail, {
  CreateOrderDoc,
  SeeRestaurantDoc,
} from "../RestaurantDetail";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ id: 1 }),
    useNavigate: () => mockNavigate,
  };
});

describe("<ReastaurantDetail />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should show restaurant", async () => {
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
                  result: {
                    id: 1,
                    role: UserRole.Customer,
                    verified: true,
                    restaurantId: null,
                  },
                },
              },
            },
          },
          {
            request: {
              query: SeeRestaurantDoc,
              variables: { input: { restaurantId: 1 } },
            },
            result: {
              data: {
                seeRestaurant: {
                  ok: true,
                  error: null,
                  result: {
                    id: 1,
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
                  },
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <RestaurantDetail />
        </BrowserRouter>
      </MockedProvider>
    );
    const restaurantImg = await screen.findByAltText("restaurant cover");
    expect(restaurantImg).toHaveAttribute("src", "restaurant image");
    screen.getByText("restaurant name");
    expect(screen.getByAltText("dish cover")).toHaveAttribute(
      "src",
      "dish image"
    );
    screen.getByText("dish name");
    screen.getByText("$10");
    screen.getByText("+$5");
    screen.getByText("option name");
  });
  it("should create an order", async () => {
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
                  result: {
                    id: 1,
                    role: UserRole.Customer,
                    verified: true,
                    restaurantId: null,
                  },
                },
              },
            },
          },
          {
            request: {
              query: SeeRestaurantDoc,
              variables: { input: { restaurantId: 1 } },
            },
            result: {
              data: {
                seeRestaurant: {
                  ok: true,
                  error: null,
                  result: {
                    id: 1,
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
                  },
                },
              },
            },
          },
          {
            request: {
              query: CreateOrderDoc,
              variables: {
                input: {
                  dishes: [
                    {
                      dishId: 2,
                      count: 1,
                      options: [
                        {
                          name: "option name",
                        },
                      ],
                    },
                  ],
                  location: "서울시 강남구 청담동 123-123",
                  restaurantId: 1,
                },
              },
            },
            result: {
              data: {
                createOrder: {
                  ok: true,
                  orderId: 3,
                  error: null,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <RestaurantDetail />
        </BrowserRouter>
      </MockedProvider>
    );
    const dishOption = await screen.findByTestId("dish-option-checkbox");
    userEvent.click(dishOption);
    const dish = screen.getByTestId("dish-button");
    userEvent.click(dish);
    const order = screen.getByTestId("order-button");
    userEvent.click(order);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith("/orders/3");
    });
  });
});
