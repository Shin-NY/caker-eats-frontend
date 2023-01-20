import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
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
      orderId
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
  const navigate = useNavigate();
  const [pickupOrderMutation, { loading: pickupLoading }] =
    usePickupOrderMutation({
      onCompleted: ({ pickupOrder: { ok, orderId } }) => {
        if (ok && orderId) {
          navigate(`orders/${orderId}`);
        }
      },
    });

  const onPickup = (orderId: number) => {
    if (!pickupLoading) {
      pickupOrderMutation({ variables: { input: { orderId } } });
    }
  };

  const onClickOrder = (id: number) => {
    if (id) {
      navigate(`/orders/${id}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {orders.map(order => (
        <div
          onClick={() => (isCookedOrders ? null : onClickOrder(order?.id!))}
          key={order.id}
          className={`${
            !isCookedOrders && "cursor-pointer"
          } p-4 border border-black rounded grid grid-cols-2`}
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
        </div>
      ))}
    </div>
  );
};

export default OrderList;
