import { gql } from "@apollo/client";
import Footer from "../components/footer";
import Header from "../components/header";
import Loading from "../components/loading";
import OrderList from "../components/orderList";
import { useSeeOrdersQuery } from "../generated/graphql";

export const SeeOrdersDoc = gql`
  query SeeOrders {
    seeOrders {
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

const Orders = () => {
  const { data: ordersData, loading: ordersLoading } = useSeeOrdersQuery();

  return ordersLoading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="shared-width py-16">
        <h1 className="text-2xl font-bold">Orders</h1>
        <OrderList orders={ordersData?.seeOrders.result} />
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
