import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import { useSeeRestaurantsQuery } from "../generated/graphql";

gql`
  query SeeRestaurants($input: SeeRestaurantsInput!) {
    seeRestaurants(input: $input) {
      ok
      error
      result {
        id
        name
        imageUrl
      }
      totalPages
    }
  }
`;

const Home = () => {
  const { data, loading } = useSeeRestaurantsQuery({
    variables: { input: { page: 1 } },
  });

  return (
    <div>
      <div className="flex justify-center w-full py-32 bg-yellow-400">
        <div className="shared-width">
          <h1 className=" text-4xl font-bold">Order cake to your door</h1>
          <form className=" flex items-center gap-2 mt-10 text-md">
            <input className=" outline-none py-3 px-4 w-96 shadow-sm transition duration-300 border-b-2 border-b-white focus:border-b-black" />
            <button className="font-semibold rounded py-3 px-4 shadow-sm bg-black text-white">
              Find
            </button>
          </form>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="py-16 shared-width">
          {loading ? (
            <Loading />
          ) : (
            <div className=" grid grid-cols-3 gap-6">
              {data?.seeRestaurants.result?.map(restaurant => (
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  className=" flex  flex-col"
                >
                  <img
                    className="rounded-sm w-full h-48 object-cover"
                    src={restaurant.imageUrl || ""}
                    alt=""
                  />
                  <h2 className="mt-1 text-lg font-medium">
                    {restaurant.name}
                  </h2>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
