import { gql, QueryHookOptions } from "@apollo/client";
import { Exact, SeeMeQuery, useSeeMeQuery } from "../generated/graphql";

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

const useMe = (
  options?: QueryHookOptions<
    SeeMeQuery,
    Exact<{
      [key: string]: never;
    }>
  >
) => {
  return useSeeMeQuery(options);
};

export default useMe;
