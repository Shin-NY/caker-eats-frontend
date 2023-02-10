import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../components/loading";
import { UserRole } from "../generated/graphql";
import useMe from "../hooks/useMe";
import Home from "../routes/home";
import CreateRestaurant from "../routes/createRestaurant";
import RestaurantDetail from "../routes/restaurantDetail";
import Search from "../routes/search";
import CreateDish from "../routes/createDish";
import OrderDetail from "../routes/orderDetail";
import Orders from "../routes/orders";
import CookedOrders from "../routes/cookedOrders";
import MyRestaurant from "../routes/myRestaurant";

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
