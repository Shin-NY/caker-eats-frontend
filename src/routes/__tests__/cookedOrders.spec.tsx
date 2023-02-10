import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { OrderStatus } from "../../generated/graphql";
import CookedOrders, {
  ORDER_COOKED_SUBSCRIPTION,
  SeeCookedOrdersDoc,
} from "../cookedOrders";

const mockOrderList = jest.fn((props: any) => <span>mocked OrderList</span>);
jest.mock("../../components/OrderList", () => {
  return (props: any) => mockOrderList(props);
});

describe("<CookedOrders />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const cookedOrder = {
    id: 1,
    createdAt: "createdAt",
    location: "location",
    customer: {
      id: 2,
      email: "customer@email.com",
    },
    restaurant: {
      id: 3,
      name: "restaurant name",
    },
    status: OrderStatus.Cooked,
  };
  const newCookedOrder = {
    id: 2,
    createdAt: "createdAt",
    location: "location",
    customer: {
      id: 2,
      email: "customer@email.com",
    },
    restaurant: {
      id: 3,
      name: "restaurant name",
    },
    status: OrderStatus.Cooked,
  };
  it("should show cooked orders", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SeeCookedOrdersDoc,
              variables: { input: { page: 1 } },
            },
            result: {
              data: {
                seeCookedOrders: {
                  ok: true,
                  error: null,
                  result: [cookedOrder],
                },
              },
            },
          },
          {
            request: {
              query: ORDER_COOKED_SUBSCRIPTION,
            },
            result: {
              data: {
                orderCooked: newCookedOrder,
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <CookedOrders />
        </BrowserRouter>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(mockOrderList).toBeCalledWith({
        isCookedOrders: true,
        orders: [newCookedOrder, cookedOrder],
      });
    });
  });
});
