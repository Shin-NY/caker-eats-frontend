import { gql } from "@apollo/client";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import OrderList from "../Components/OrderList";
import { useSeeOrdersQuery } from "../generated/graphql";

gql`
  query SeeOrders {
    seeOrders {
      ok
      error
      result {
        id
        createdAt
        location
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
        <OrderList
          isCookedOrders={false}
          orders={ordersData?.seeOrders.result?.slice().reverse() || []}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
