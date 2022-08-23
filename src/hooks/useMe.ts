import { gql } from "@apollo/client";
import { useSeeMeQuery } from "../generated/graphql";

gql`
  query seeMe {
    seeMe {
      ok
      error
      result {
        id
        role
        verified
        restaurantId
      }
    }
  }
`;

const useMe = () => {
  return useSeeMeQuery();
};

export default useMe;
