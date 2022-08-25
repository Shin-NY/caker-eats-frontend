import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { useSeeOrderQuery } from "../generated/graphql";

gql`
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
  const { id: orderId } = useParams();
  const { data: orderData, loading: orderLoading } = useSeeOrderQuery({
    variables: { input: { orderId: +(orderId || "0") } },
  });

  return orderLoading ? (
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
        <h3 className="mt-6 button text-center">
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
