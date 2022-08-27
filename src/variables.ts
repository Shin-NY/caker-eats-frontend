import { makeVar } from "@apollo/client";
import { client } from "./apollo";

export const LS_TOKEN = "token";

export const tokenVar = makeVar(localStorage.getItem(LS_TOKEN) || "");

export const onLogIn = (token: string) => {
  tokenVar(token);
  localStorage.setItem(LS_TOKEN, token);
};

export const onLogOut = () => {
  tokenVar("");
  localStorage.setItem(LS_TOKEN, "");
  client.cache.reset();
};
