import { useReactiveVar } from "@apollo/client";
import LoggedOutRouter from "./routers/loggedOutRouter";
import Router from "./routers/router";
import { tokenVar } from "./variables";

function App() {
  const token = useReactiveVar(tokenVar);
  return token ? <Router /> : <LoggedOutRouter />;
}

export default App;
