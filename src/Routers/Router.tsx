import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import RestaurantDetail from "../Routes/RestaurantDetail";
import Search from "../Routes/Search";
import Signup from "../Routes/Signup";

const Router = () => {
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

export default Router;
