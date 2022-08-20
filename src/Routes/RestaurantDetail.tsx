import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { useSeeRestaurantQuery } from "../generated/graphql";

gql`
  query SeeRestaurant($input: SeeRestaurantInput!) {
    seeRestaurant(input: $input) {
      ok
      error
      result {
        id
        name
        imageUrl
        menu {
          id
          name
          description
          imageUrl
          price
          options {
            name
            extra
          }
        }
      }
    }
  }
`;

const RestaurantDetail = () => {
  const { id } = useParams();
  const { data, loading } = useSeeRestaurantQuery({
    variables: { input: { restaurantId: +(id || "0") } },
  });

  return loading ? (
    <Loading />
  ) : (
    <div>
      <img
        className=" w-full h-72 object-cover"
        src={data?.seeRestaurant.result?.imageUrl || ""}
        alt=""
      />
      <div className="flex flex-col items-center">
        <div className=" shared-width">
          <h1 className="mt-4 text-3xl font-bold">
            {data?.seeRestaurant.result?.name}
          </h1>
          <div className="py-16 grid grid-cols-4 gap-6">
            {data?.seeRestaurant.result?.menu.map(dish => (
              <div className="p-2 hover:scale-105 hover:shadow-2xl transition duration-500">
                <img
                  className=" rounded-sm w-full h-48 object-cover"
                  src={dish.imageUrl || ""}
                  alt=""
                />
                <h2 className="font-medium">{dish.name}</h2>
                <h3 className=" text-sm">${dish.price}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
