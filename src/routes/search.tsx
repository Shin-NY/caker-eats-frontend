import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import RestaurantGrid from "../components/restaurantGrid";
import { useSearchRestaurantQuery } from "../generated/graphql";

export const SearchRestaurantDoc = gql`
  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      result {
        id
        name
        imageUrl
      }
    }
  }
`;

const Search = () => {
  const { key } = useParams();
  const { data, loading } = useSearchRestaurantQuery({
    variables: { input: { page: 1, key: key || "" } },
  });

  return (
    <div>
      <Header />
      <div className="p-10 shared-width">
        {loading ? (
          <Loading />
        ) : (
          <RestaurantGrid restaurants={data?.searchRestaurant.result || []} />
        )}
      </div>
    </div>
  );
};

export default Search;
