import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import RestaurantDetail from "../routes/RestaurantDetail";
import Search from "../routes/Search";
import Signup from "../routes/Signup";

const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/search/:key" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoggedOutRouter;
