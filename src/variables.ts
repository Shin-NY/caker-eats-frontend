import { makeVar } from "@apollo/client";

export const LS_TOKEN = "token";

export const tokenVar = makeVar(localStorage.getItem(LS_TOKEN) || "");
