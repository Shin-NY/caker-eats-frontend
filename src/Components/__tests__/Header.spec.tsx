import { render, screen, waitFor } from "@testing-library/react";
import Header from "../Header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { SeeMeQueryDoc } from "../../hooks/useMe";
import { UserRole } from "../../generated/graphql";

describe("<Header />", () => {
  it("should show header", async () => {
    render(
      <BrowserRouter>
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
                    result: null,
                  },
                },
              },
            },
          ]}
        >
          <Header />
        </MockedProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      screen.getByText(/caker/i);
      screen.getByText(/eats/i);
      screen.getByText(/log in/i);
      screen.getByText(/sign up/i);
    });
  });
  it("should show search input for customer", async () => {
    render(
      <BrowserRouter>
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
          ]}
        >
          <Header />
        </MockedProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      screen.getByPlaceholderText(/search restaurants.../i);
    });
  });
});
