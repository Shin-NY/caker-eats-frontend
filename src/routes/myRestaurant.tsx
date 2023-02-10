import { gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import Loading from "../components/loading";
import { useSeeRestaurantLazyQuery } from "../generated/graphql";
import useMe from "../hooks/useMe";

export const SeeRestaurantDoc = gql`
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

const MyRestaurant = () => {
  const navigate = useNavigate();
  const [seeRestaurantQuery, { data, loading }] = useSeeRestaurantLazyQuery();
  const { data: meData, loading: meLoading } = useMe({
    onCompleted: ({ seeMe: { result } }) => {
      if (result?.restaurantId)
        seeRestaurantQuery({
          variables: {
            input: { restaurantId: result.restaurantId },
          },
        });
    },
  });

  return (
    <div>
      <Header />
      {loading || meLoading ? (
        <Loading />
      ) : !meData?.seeMe.result?.restaurantId ? (
        <div className="w-full h-72 flex justify-center items-center flex-col gap-2">
          <h3 className=" text-lg font-medium">You don't have a restaurant</h3>
          <Link to={"/create-restaurant"}>
            <button className="button" data-testid="create-restaurant-btn">
              Create restaurant
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <img
            className=" w-full h-72 object-cover"
            src={data?.seeRestaurant.result?.imageUrl || ""}
            alt="restaurant cover"
          />
          <div className="flex flex-col items-center">
            <div className=" shared-width">
              <h1 className="mt-4 mr-8 text-3xl font-bold">
                {data?.seeRestaurant.result?.name}
              </h1>
              <div>
                <button
                  onClick={() => navigate("/create-dish")}
                  className="button w-32 mt-6"
                >
                  New dish
                </button>
              </div>
              <div className="py-16 grid grid-cols-4 gap-6">
                {data?.seeRestaurant.result?.menu.map(dish => (
                  <div
                    key={dish.id}
                    className="  p-2 hover:scale-105 hover:shadow-2xl transition duration-500"
                  >
                    <img
                      className=" rounded-sm w-full h-48 object-cover"
                      src={dish.imageUrl || ""}
                      alt="dish cover"
                    />
                    <div className="mt-1 flex justify-between items-center">
                      <h2 className="font-medium">{dish.name}</h2>
                    </div>
                    <h3 className=" text-sm">${dish.price}</h3>
                    <div>
                      <h3 className="font-medium mt-2">options</h3>
                      {dish.options?.map((option, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="flex gap-1 text-sm">
                            <h4>+${option.extra || 0}</h4>
                            <h4>{option.name}</h4>
                          </div>
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

export default MyRestaurant;
