import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home, {
  SeeCategoriesDoc,
  SeeCategoryDoc,
  SeeRestaurantsDoc,
} from "../Home";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("<Home />", () => {
  it("should show cateogries & restaurants", async () => {
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
                  result: [
                    {
                      id: 1,
                      name: "category name",
                      slug: "category slug",
                      imageUrl: "category image",
                    },
                  ],
                },
              },
            },
          },
          {
            request: {
              query: SeeRestaurantsDoc,
              variables: {
                input: {
                  page: 1,
                },
              },
            },
            result: {
              data: {
                seeRestaurants: {
                  ok: true,
                  error: null,
                  result: [
                    {
                      id: 2,
                      name: "restaurant name",
                      imageUrl: "restaurant image",
                    },
                  ],
                  totalPages: 1,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MockedProvider>
    );
    await waitFor(() => {
      screen.getByText("category name");
      expect(screen.getByAltText(/category cover/i)).toHaveAttribute(
        "src",
        "category image"
      );
      screen.getByText("restaurant name");
    });
  });
  it("should show restaurants of category", async () => {
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
                  result: [
                    {
                      id: 1,
                      name: "category name",
                      slug: "category-slug",
                      imageUrl: "category image",
                    },
                  ],
                },
              },
            },
          },
          {
            request: {
              query: SeeRestaurantsDoc,
              variables: {
                input: {
                  page: 1,
                },
              },
            },
            result: {
              data: {
                seeRestaurants: {
                  ok: true,
                  error: null,
                  result: [
                    {
                      id: 2,
                      name: "restaurant name",
                      imageUrl: "restaurant image",
                    },
                  ],
                  totalPages: 1,
                },
              },
            },
          },
          {
            request: {
              query: SeeCategoryDoc,
              variables: {
                input: {
                  page: 1,
                  slug: "category-slug",
                },
              },
            },
            result: {
              data: {
                seeCategory: {
                  ok: true,
                  error: null,
                  result: {
                    id: 1,
                    restaurants: [
                      {
                        id: 3,
                        name: "restaurant name by category",
                        imageUrl: "restaurant image by category",
                      },
                    ],
                  },
                  totalPages: 1,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MockedProvider>
    );
    const category = await screen.findByRole("group");
    userEvent.click(category);
    await screen.findByText(/restaurant name by category/i);
  });
});
