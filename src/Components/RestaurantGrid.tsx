import { Link } from "react-router-dom";
import { SeeRestaurantsQuery } from "../generated/graphql";

const RestaurantGrid = ({
  restaurants,
}: {
  restaurants: SeeRestaurantsQuery["seeRestaurants"]["result"];
}) => {
  return (
    <div className=" grid grid-cols-3 gap-6">
      {restaurants?.map(restaurant => (
        <Link
          role={"gridcell"}
          key={restaurant.id}
          to={`/restaurants/${restaurant.id}`}
          className=" flex  flex-col"
        >
          <img
            role={"img"}
            className="rounded-sm w-full h-48 object-cover"
            src={restaurant.imageUrl || ""}
            alt=""
          />
          <h2 className="mt-1 text-lg font-medium">{restaurant.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantGrid;
