import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search, { SearchRestaurantDoc } from "../Search";

const mockRestaurantGrid = jest.fn((params: any) => <span>test</span>);

jest.mock("../../components/RestaurantGrid", () => {
  return (params: any) => mockRestaurantGrid(params);
});

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ key: "key" }),
  };
});

describe("<Search />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should show search result", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SearchRestaurantDoc,
              variables: { input: { page: 1, key: "key" } },
            },
            result: {
              data: {
                searchRestaurant: {
                  ok: true,
                  error: null,
                  totalPages: 1,
                  result: [
                    {
                      id: 1,
                      name: "restaurant name",
                      imageUrl: "restaurant image",
                    },
                  ],
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(mockRestaurantGrid).toBeCalledWith({
        restaurants: [
          {
            id: 1,
            imageUrl: "restaurant image",
            name: "restaurant name",
          },
        ],
      });
    });
  });
});
