import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { client } from "../../apollo";
import { OrderStatus, UserRole } from "../../generated/graphql";
import { SeeMeQueryDoc } from "../../hooks/useMe";
import OrderDetail, { EditOrderStatusDoc, SeeOrderDoc } from "../OrderDetail";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ id: 1 }),
  };
});

describe("<OrderDetail />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const order = {
    id: 1,
    createdAt: "createdAt",
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
    location: "location",
    customer: {
      id: 3,
      email: "customer@email.com",
    },
    restaurant: {
      id: 4,
      name: "restaurant name",
      menu: [
        {
          id: 2,
          name: "dish name",
        },
      ],
      imageUrl: "restaurant image",
    },
    driver: {
      id: 5,
      email: "driver@email.com",
    },
    status: OrderStatus.PickedUp,
  };
  it("should show order detail", async () => {
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
                    id: order.driver.id,
                    role: UserRole.Driver,
                    verified: true,
                    restaurantId: null,
                  },
                },
              },
            },
          },
          {
            request: {
              query: SeeOrderDoc,
              variables: { input: { orderId: order.id } },
            },
            result: {
              data: {
                seeOrder: {
                  ok: true,
                  error: null,
                  result: order,
                },
              },
            },
          },
          {
            request: {
              query: EditOrderStatusDoc,
              variables: {
                input: { orderId: order.id, status: OrderStatus.Delivered },
              },
            },
            result: {
              data: {
                editOrderStatus: {
                  ok: true,
                  error: null,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <OrderDetail />
        </BrowserRouter>
      </MockedProvider>
    );
    await screen.findByText(order.restaurant.name);
    screen.getByText(order.customer.email);
    screen.getByText(order.driver.email);
    screen.getByText(order.restaurant.menu[0].name);
    screen.getByText(order.dishes[0].count);
    screen.getByText("+" + order.dishes[0].options[0].name);
    screen.getByText(order.location);
    const status = screen.getByText(order.status);
    screen.getByText(order.createdAt);
    userEvent.click(status);
    await waitFor(() => {
      jest.spyOn(client.cache, "modify");
      expect(client.cache.modify).toBeCalledWith({
        id: `Order:${order.id}`,
        fields: {
          status: expect.any(Function),
        },
      });
    });
  });
});
