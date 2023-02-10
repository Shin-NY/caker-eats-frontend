import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { UserRole } from "../../generated/graphql";
import { SeeMeQueryDoc } from "../../hooks/useMe";
import CreateDish, { CreateDishDoc } from "../createDish";
import * as utils from "../../utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  };
});

describe("<CreateDish />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const owner = {
    id: 1,
    role: UserRole.Owner,
    verified: true,
    restaurantId: 1,
  };
  const dish = {
    id: 2,
    name: "dish name",
    imageUrl: "dish image",
    price: 10,
    description: "dish description",
    options: [{ name: "option name", extra: 5 }],
  };
  it("should show form error", async () => {
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
        ]}
      >
        <BrowserRouter>
          <CreateDish />
        </BrowserRouter>
      </MockedProvider>
    );
    const button = await screen.findByTestId("create-dish-button");
    userEvent.click(button);
    await waitFor(() => {
      screen.getByText("Name is required");
      screen.getByText("Price is required");
    });
  });
  it("should create dish", async () => {
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
              query: CreateDishDoc,
              variables: {
                input: {
                  name: dish.name,
                  imageUrl: dish.imageUrl,
                  price: dish.price,
                  description: dish.description,
                  options: dish.options,
                },
              },
            },
            result: {
              data: {
                createDish: {
                  ok: true,
                  error: null,
                  dishId: dish.id,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <CreateDish />
        </BrowserRouter>
      </MockedProvider>
    );
    jest
      .spyOn(utils, "uploadImage")
      .mockResolvedValueOnce({ ok: true, url: dish.imageUrl });
    const dishName = await screen.findByPlaceholderText("dish name");
    userEvent.type(dishName, dish.name);
    const price = screen.getByPlaceholderText("$ price");
    userEvent.type(price, dish.price + "");
    const description = screen.getByPlaceholderText("description");
    userEvent.type(description, dish.description);
    const addOptionBtn = screen.getByTestId("add-option-button");
    userEvent.click(addOptionBtn);
    const optionName = await screen.findByPlaceholderText("option name");
    userEvent.type(optionName, dish.options[0].name);
    const extra = await screen.findByPlaceholderText("$ extra");
    userEvent.type(extra, dish.options[0].extra + "");
    const createDishBtn = screen.getByTestId("create-dish-button");
    userEvent.click(createDishBtn);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith("/");
    });
  });
});
