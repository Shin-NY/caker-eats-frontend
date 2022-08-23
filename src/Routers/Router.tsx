import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../Components/Loading";
import { UserRole } from "../generated/graphql";
import useMe from "../hooks/useMe";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import CreateRestaurant from "../Routes/CreateRestaurant";
import RestaurantDetail from "../Routes/RestaurantDetail";
import Search from "../Routes/Search";
import Signup from "../Routes/Signup";

const Router = () => {
  const { data: meData, loading: meLoading } = useMe();

  const ownerRoutes = [
    <Route key={1} path="/create-restaurant" element={<CreateRestaurant />} />,
  ];

  return meLoading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/search/:key" element={<Search />} />
        {meData?.seeMe.result?.role === UserRole.Owner && ownerRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
