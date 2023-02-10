import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/home";
import Login from "../routes/login";
import RestaurantDetail from "../routes/restaurantDetail";
import Search from "../routes/search";
import Signup from "../routes/signup";

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
