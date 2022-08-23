import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LS_TOKEN } from "./variables";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LS_TOKEN);
  return {
    headers: {
      ...headers,
      "x-token": token || "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql/",
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
