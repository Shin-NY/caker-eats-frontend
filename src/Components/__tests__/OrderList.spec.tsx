import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { OrderStatus } from "../../generated/graphql";
import OrderList from "../OrderList";

describe("<OrderList />", () => {
  it("should show orders", () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <OrderList
            orders={[
              {
                id: 1,
                createdAt: Date.now(),
                location: "location",
                status: OrderStatus.Pending,
                customer: { id: 2, email: "email" },
                restaurant: { id: 3, name: "restaurant name" },
              },
            ]}
          />
        </BrowserRouter>
      </MockedProvider>
    );
    screen.getByText(/restaurant: restaurant name/i);
    screen.getByText(/to: location/i);
    screen.getByText(OrderStatus.Pending);
  });
});
