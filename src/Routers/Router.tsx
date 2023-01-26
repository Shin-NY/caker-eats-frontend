import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import { UserRole } from "../generated/graphql";
import useMe from "../hooks/useMe";
import Home from "../routes/Home";
import CreateRestaurant from "../routes/CreateRestaurant";
import RestaurantDetail from "../routes/RestaurantDetail";
import Search from "../routes/Search";
import CreateDish from "../routes/CreateDish";
import OrderDetail from "../routes/OrderDetail";
import Orders from "../routes/Orders";
import CookedOrders from "../routes/CookedOrders";
import MyRestaurant from "../routes/MyRestaurant";

const Router = () => {
  const { data: meData, loading: meLoading } = useMe();

  const customerRoutes = [
    <Route key={1} path="/" element={<Home />} />,
    <Route key={2} path="/search/:key" element={<Search />} />,
    <Route key={3} path="/restaurants/:id" element={<RestaurantDetail />} />,
  ];

  const ownerRoutes = [
    <Route key={1} path="/" element={<MyRestaurant />} />,
    <Route key={2} path="/create-restaurant" element={<CreateRestaurant />} />,
    <Route key={3} path="/create-dish" element={<CreateDish />} />,
  ];

  const driverRoutes = [<Route key={1} path="/" element={<CookedOrders />} />];

  return meLoading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Routes>
        {meData?.seeMe.result?.role === UserRole.Customer && customerRoutes}
        {meData?.seeMe.result?.role === UserRole.Owner && ownerRoutes}
        {meData?.seeMe.result?.role === UserRole.Driver && driverRoutes}
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
