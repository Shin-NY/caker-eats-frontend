import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LS_TOKEN } from "./variables";
import { onError } from "@apollo/client/link/error";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LS_TOKEN);
  return {
    headers: {
      ...headers,
      "x-token": token || "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql/",
});

export const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});
