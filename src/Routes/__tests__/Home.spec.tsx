import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home, { SeeCategoriesDoc, SeeRestaurantsDoc } from "../Home";
import "@testing-library/jest-dom/extend-expect";

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
  it.todo("show restaurants of category");
});
