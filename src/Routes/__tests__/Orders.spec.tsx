import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { OrderStatus } from "../../generated/graphql";
import Orders, { SeeOrdersDoc } from "../Orders";

const mockOrderList = jest.fn((props: any) => <span>mocked order list</span>);
jest.mock("../../components/OrderList", () => {
  return (props: any) => mockOrderList(props);
});

describe("<Orders />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should show orders", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SeeOrdersDoc,
            },
            result: {
              data: {
                seeOrders: {
                  ok: true,
                  error: null,
                  result: [
                    {
                      id: 1,
                      createdAt: "createdAt",
                      location: "location",
                      customer: {
                        id: 2,
                        email: "customer email",
                      },
                      restaurant: {
                        id: 3,
                        name: "restaurant name",
                      },
                      status: OrderStatus.Pending,
                    },
                  ],
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Orders />
        </BrowserRouter>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(mockOrderList).toBeCalledWith({
        isCookedOrders: false,
        orders: [
          {
            createdAt: "createdAt",
            customer: {
              email: "customer email",
              id: 2,
            },
            id: 1,
            location: "location",
            restaurant: {
              id: 3,
              name: "restaurant name",
            },
            status: OrderStatus.Pending,
          },
        ],
      });
    });
  });
});
