import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { client } from "../apollo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import {
  OrderStatus,
  useEditOrderStatusMutation,
  UserRole,
  useSeeOrderQuery,
} from "../generated/graphql";
import useMe from "../hooks/useMe";

export const EditOrderStatusDoc = gql`
  mutation EditOrderStatus($input: EditOrderStatusInput!) {
    editOrderStatus(input: $input) {
      ok
      error
    }
  }
`;

export const SeeOrderDoc = gql`
  query SeeOrder($input: SeeOrderInput!) {
    seeOrder(input: $input) {
      ok
      error
      result {
        id
        createdAt
        dishes {
          dishId
          count
          options {
            name
          }
        }
        location
        customer {
          id
          email
        }
        restaurant {
          id
          name
          menu {
            id
            name
          }
          imageUrl
        }
        driver {
          id
          email
        }
        status
      }
    }
  }
`;

const OrderDetail = () => {
  const { data: meData, loading: meLoading } = useMe();
  const { id: orderId } = useParams();
  const { data: orderData, loading: orderLoading } = useSeeOrderQuery({
    variables: { input: { orderId: +(orderId || "0") } },
  });
  let nextStatus: OrderStatus | null = null;
  if (meData?.seeMe.result?.role === UserRole.Owner) {
    if (orderData?.seeOrder.result?.status === OrderStatus.Pending)
      nextStatus = OrderStatus.Cooking;
    else if (orderData?.seeOrder.result?.status === OrderStatus.Cooking)
      nextStatus = OrderStatus.Cooked;
  } else if (meData?.seeMe.result?.role === UserRole.Driver) {
    if (orderData?.seeOrder.result?.status === OrderStatus.PickedUp)
      nextStatus = OrderStatus.Delivered;
  }

  const [editOrderStatusMutation, { loading: editLoading }] =
    useEditOrderStatusMutation({
      onCompleted: ({ editOrderStatus: { ok } }) => {
        if (ok) {
          client.cache.modify({
            id: `Order:${orderId}`,
            fields: {
              status() {
                return nextStatus;
              },
            },
          });
        }
      },
    });

  const onEdit = () => {
    if (!editLoading && nextStatus) {
      editOrderStatusMutation({
        variables: {
          input: { orderId: +(orderId || "0"), status: nextStatus },
        },
      });
    }
  };

  return orderLoading || meLoading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="border border-black rounded w-min mx-auto p-12 py-10 my-16 flex flex-col items-center">
        <h1 className="text-xl font-medium">Order</h1>
        <div className="mt-6 grid grid-cols-2 gap-y-4">
          <h2 className="font-medium">Restaurant</h2>
          <h2>{orderData?.seeOrder.result?.restaurant?.name}</h2>

          <h2 className="font-medium">Customer</h2>
          <h2>{orderData?.seeOrder.result?.customer?.email}</h2>

          <h2 className="font-medium">Driver</h2>
          <h2>{orderData?.seeOrder.result?.driver?.email}</h2>

          <h2 className="font-medium">Dishes</h2>
          <div className="flex flex-col gap-2">
            {orderData?.seeOrder.result?.dishes.map(dish => (
              <div key={dish.dishId}>
                <div className="flex gap-2">
                  <h3>
                    {
                      orderData.seeOrder.result?.restaurant?.menu.find(
                        menuDish => menuDish.id === dish.dishId
                      )?.name
                    }
                  </h3>
                  <h4>{dish.count}</h4>
                </div>
                {dish.options?.map((option, index) => (
                  <h5 className="ml-2" key={index}>
                    +{option.name}
                  </h5>
                ))}
              </div>
            ))}
          </div>

          <h4 className="font-medium">Location</h4>
          <h4>{orderData?.seeOrder.result?.location}</h4>
        </div>
        <h3
          {...(nextStatus && {
            style: {
              cursor: "pointer",
            },
            onClick: onEdit,
            onMouseOver: e =>
              (e.currentTarget.innerText = `Change to ${nextStatus}` || ""),
            onMouseLeave: e =>
              (e.currentTarget.innerText =
                orderData?.seeOrder.result?.status || ""),
          })}
          className="mt-6 button text-center"
        >
          {orderData?.seeOrder.result?.status}
        </h3>
        <h5 className="text-xs mt-4">
          {orderData?.seeOrder.result?.createdAt}
        </h5>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
