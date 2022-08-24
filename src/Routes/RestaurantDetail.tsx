import { gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { useSeeRestaurantQuery } from "../generated/graphql";
import useMe from "../hooks/useMe";

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
  const navigate = useNavigate();
  const { data: meData, loading: meLoading } = useMe();
  const { id } = useParams();
  const { data, loading } = useSeeRestaurantQuery({
    variables: { input: { restaurantId: +(id || "0") } },
  });

  return (
    <div>
      <Header />
      {loading || meLoading ? (
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
              {id === "" + meData?.seeMe.result?.restaurantId && (
                <div>
                  <button
                    onClick={() => navigate("/create-dish")}
                    className="button w-32 mt-6"
                  >
                    New dish
                  </button>
                </div>
              )}
              <div className="py-16 grid grid-cols-4 gap-6">
                {data?.seeRestaurant.result?.menu.map(dish => (
                  <div
                    key={dish.id}
                    className="  p-2 hover:scale-105 hover:shadow-2xl transition duration-500"
                  >
                    <img
                      className=" rounded-sm w-full h-48 object-cover"
                      src={dish.imageUrl || ""}
                      alt=""
                    />
                    <h2 className="font-medium">{dish.name}</h2>
                    <h3 className=" text-sm">${dish.price}</h3>
                    <div>
                      <h3 className="font-medium mt-2">options</h3>
                      {dish.options?.map(option => (
                        <div className="flex gap-1 text-sm">
                          <h4>+${option.extra || 0}</h4>
                          <h4>{option.name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
