import { useReactiveVar } from "@apollo/client";
import LoggedOutRouter from "./Routers/LoggedOutRouter";
import Router from "./Routers/Router";
import { tokenVar } from "./variables";

function App() {
  const token = useReactiveVar(tokenVar);
  return token ? <Router /> : <LoggedOutRouter />;
}

export default App;
