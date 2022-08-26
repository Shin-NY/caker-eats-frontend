import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Order,
  OrderStatus,
  usePickupOrderMutation,
} from "../generated/graphql";
import Loading from "./Loading";

gql`
  mutation PickupOrder($input: PickupOrderInput!) {
    pickupOrder(input: $input) {
      ok
      error
    }
  }
`;

const OrderList = ({
  orders,
  isCookedOrders,
}: {
  isCookedOrders: boolean;
  orders:
    | Partial<Order>[]
    | Array<{
        __typename?: "Order";
        id: number;
        createdAt: any;
        location: string;
        customer?: { __typename?: "User"; id: number; email: string } | null;
        restaurant?: {
          __typename?: "Restaurant";
          id: number;
          name: string;
        } | null;
        status: OrderStatus;
      }>;
}) => {
  const [pickupOrderMutation, { loading: pickupLoading }] =
    usePickupOrderMutation();

  const onPickup = (orderId: number) => {
    if (!pickupLoading) {
      pickupOrderMutation({ variables: { input: { orderId } } });
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {orders.map(order => (
        <Link
          to={`/orders/${order.id}`}
          key={order.id}
          className="p-4 border border-black rounded grid grid-cols-2 "
        >
          <div>
            <h3 className=" font-semibold">
              restaurant: {order.restaurant?.name}
            </h3>
            <h3 className=" font-semibold">to: {order.location}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            {isCookedOrders ? (
              <button
                onClick={() => onPickup(order.id || 0)}
                className="button"
              >
                {pickupLoading ? <Loading /> : "Pickup"}
              </button>
            ) : (
              <h3 className="button text-center">{order.status}</h3>
            )}
            <h4 className="text-xs">{order.createdAt}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrderList;
