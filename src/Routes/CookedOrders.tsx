import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Loading from "../components/loading";
import OrderList from "../components/orderList";
import {
  OrderCookedSubscription,
  OrderCookedSubscriptionVariables,
  useSeeCookedOrdersQuery,
} from "../generated/graphql";

export const ORDER_COOKED_SUBSCRIPTION = gql`
  subscription OrderCooked {
    orderCooked {
      id
      createdAt
      location
      customer {
        id
        email
      }
      restaurant {
        id
        name
      }
      status
    }
  }
`;

export const SeeCookedOrdersDoc = gql`
  query SeeCookedOrders($input: SeeCookedOrdersInput!) {
    seeCookedOrders(input: $input) {
      ok
      error
      result {
        id
        createdAt
        location
        customer {
          id
          email
        }
        restaurant {
          id
          name
        }
        status
      }
    }
  }
`;

const CookedOrders = () => {
  const [subscribed, setSubscribed] = useState(false);
  const {
    data: ordersData,
    loading: ordersLoading,
    subscribeToMore,
  } = useSeeCookedOrdersQuery({
    variables: { input: { page: 1 } },
  });

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
      subscribeToMore<
        OrderCookedSubscription,
        OrderCookedSubscriptionVariables
      >({
        document: ORDER_COOKED_SUBSCRIPTION,
        /**@ts-ignore/ */
        updateQuery: (prev, { subscriptionData }) => {
          const newOrder = subscriptionData.data.orderCooked;
          if (prev.seeCookedOrders.result)
            return {
              ...prev,
              seeCookedOrders: {
                ...prev.seeCookedOrders,
                result: [...prev.seeCookedOrders.result, newOrder],
              },
            };
          return [newOrder];
        },
      });
    }
  }, [subscribeToMore, subscribed]);

  return ordersLoading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="shared-width py-16">
        <h1 className="text-2xl font-bold">Cooked orders</h1>
        <OrderList
          isCookedOrders={true}
          orders={ordersData?.seeCookedOrders.result}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CookedOrders;
