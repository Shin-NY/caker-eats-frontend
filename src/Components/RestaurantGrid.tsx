import { Link } from "react-router-dom";
import { Restaurant } from "../generated/graphql";

const RestaurantGrid = ({
  restaurants,
}: {
  restaurants: Partial<Restaurant>[];
}) => {
  return (
    <div className=" grid grid-cols-3 gap-6">
      {restaurants?.map(restaurant => (
        <Link
          key={restaurant.id}
          to={`/restaurants/${restaurant.id}`}
          className=" flex  flex-col"
        >
          <img
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
