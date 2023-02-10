import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateRestaurant, { CreateRestaurantDoc } from "../createRestaurant";
import { SeeCategoriesDoc } from "../home";
import * as utils from "../../utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  };
});

describe("<CreateRestaurant />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const category = {
    id: 1,
    name: "category name",
    slug: "category-slug",
    imageUrl: "category image",
  };
  const restaurant = {
    id: 1,
    imageUrl: "restaurant image",
    name: "restaurant name",
  };
  it("should show form error", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SeeCategoriesDoc,
            },
            result: {
              data: {
                seeCategories: {
                  ok: true,
                  error: null,
                  result: [category],
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <CreateRestaurant />
        </BrowserRouter>
      </MockedProvider>
    );
    const button = await screen.findByRole("button");
    userEvent.click(button);
    await screen.findByText("Name is required");
  });
  it("should create restaurant", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SeeCategoriesDoc,
            },
            result: {
              data: {
                seeCategories: {
                  ok: true,
                  error: null,
                  result: [category],
                },
              },
            },
          },
          {
            request: {
              query: CreateRestaurantDoc,
              variables: {
                input: {
                  imageUrl: restaurant.imageUrl,
                  name: restaurant.name,
                  categorySlug: category.slug,
                },
              },
            },
            result: {
              data: {
                createRestaurant: {
                  ok: true,
                  restaurantId: restaurant.id,
                  error: null,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <CreateRestaurant />
        </BrowserRouter>
      </MockedProvider>
    );
    jest
      .spyOn(utils, "uploadImage")
      .mockResolvedValueOnce({ ok: true, url: restaurant.imageUrl });
    const name = await screen.findByPlaceholderText("Restaurant name");
    userEvent.type(name, restaurant.name);
    const categoryList = screen.getByRole("listbox");
    userEvent.selectOptions(categoryList, screen.getByRole("option"));
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith("/");
    });
  });
});
