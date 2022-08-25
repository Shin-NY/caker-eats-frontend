import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
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
        <div className="flex flex-col gap-4 mt-4">
          {ordersData?.seeOrders.result
            ?.slice()
            .reverse()
            .map(order => (
              <Link
                to={`/orders/${order.id}`}
                key={order.id}
                className="p-4 border border-black rounded grid grid-cols-2 "
              >
                <h3 className=" font-semibold">{order.location}</h3>
                <div className="flex flex-col items-end gap-2">
                  <h3 className="button text-center">{order.status}</h3>
                  <h4 className="text-xs">{order.createdAt}</h4>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
