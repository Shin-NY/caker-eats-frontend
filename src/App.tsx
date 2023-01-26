import { useReactiveVar } from "@apollo/client";
import LoggedOutRouter from "./routers/LoggedOutRouter";
import Router from "./routers/Router";
import { tokenVar } from "./variables";

function App() {
  const token = useReactiveVar(tokenVar);
  return token ? <Router /> : <LoggedOutRouter />;
}

export default App;
